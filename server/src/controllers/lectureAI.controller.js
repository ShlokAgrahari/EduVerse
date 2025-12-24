import axios from "axios";
import newCourse from "../models/course.js";
import LectureAI from "../models/lectureAI.js";
import { GoogleGenAI } from "@google/genai";

/* ----------------------------------
   CLOUDINARY: video → audio
-----------------------------------*/
const getAudioUrlFromVideo = (videoUrl) => {
  console.log("🎧 Converting video to audio URL");
  return videoUrl.replace("/upload/", "/upload/f_mp3/");
};

/* ----------------------------------
   GLADIA: start transcription
-----------------------------------*/
const startGladiaTranscription = async (audioUrl) => {
  console.log("📝 Starting Gladia transcription");

  const res = await axios.post(
    "https://api.gladia.io/v2/pre-recorded",
    { audio_url: audioUrl },
    {
      headers: {
        "Content-Type": "application/json",
        "x-gladia-key": process.env.GLADIA_API_KEY,
      },
    }
  );

  console.log("📨 Gladia transcription job created");
  return res.data.result_url;
};

/* ----------------------------------
   GLADIA: poll transcription (ROBUST)
-----------------------------------*/
const pollGladiaResult = async (resultUrl) => {
  console.log("⏳ Polling Gladia transcription result");

  while (true) {
    const res = await axios.get(resultUrl, {
      headers: { "x-gladia-key": process.env.GLADIA_API_KEY },
    });

    const status = res.data.status;

    if (status === "done") {
      console.log("✅ Gladia transcription completed");

      const transcription = res.data.result?.transcription;

      // ✅ BEST CASE: full transcript
      if (transcription?.full_transcript) {
        return transcription.full_transcript;
      }

      // ✅ FALLBACK: join utterances
      if (Array.isArray(transcription?.utterances)) {
        return transcription.utterances
          .map(u => u.text)
          .join(" ");
      }

      console.error("❌ Unknown Gladia transcription format:", transcription);
      throw new Error("Gladia returned no usable transcript");
    }

    if (status === "error") {
      throw new Error("Gladia transcription failed");
    }

    console.log("⏳ Transcription still in progress...");
    await new Promise((r) => setTimeout(r, 5000));
  }
};


/* ----------------------------------
   GLADIA: public helper
-----------------------------------*/
const transcribeWithGladia = async (audioUrl) => {
  console.log("🎤 Sending audio to Gladia");
  const resultUrl = await startGladiaTranscription(audioUrl);
  return pollGladiaResult(resultUrl);
};

/* ----------------------------------
   GEMINI (FREE TIER SAFE)
-----------------------------------*/
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINIPRO_API_KEY,
});

const generateNotesWithGemini = async (transcript) => {
  console.log("🤖 Sending transcript to Gemini");

  const prompt = `
You are an AI system that generates STUDY NOTES only.

STRICT RULES:
- Do NOT add greetings, introductions, or explanations
- Do NOT say "Hello", "As an assistant", or similar phrases
- Output ONLY the content requested below
- Every heading MUST have content under it
- Do NOT leave any bullet point unfinished
- Use clean Markdown formatting

OUTPUT FORMAT (EXACT):

## Summary
(5–6 complete sentences)

## Structured Notes
- **Heading 1**
  - Point 1
  - Point 2
- **Heading 2**
  - Point 1
  - Point 2

## Key Ideas for Revision
- Idea 1
- Idea 2
- Idea 3

Transcript:
"""
${transcript}
"""
`;


  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      temperature: 0.4,
      maxOutputTokens: 1200,
    },
  });

  console.log("✅ Gemini generated notes successfully");
  return response.candidates[0].content.parts[0].text;
};

/* ----------------------------------
   LAZY AI GENERATION (SAFE)
-----------------------------------*/
export const processLectureAI = async (courseId, lectureIndex) => {
  if (typeof lectureIndex !== "number" || lectureIndex < 0) {
    console.error("❌ Invalid lectureIndex", { courseId, lectureIndex });
    return;
  }

  console.log(
    `🚀 AI processing started | courseId=${courseId} | lectureIndex=${lectureIndex}`
  );


  try {
    const existing = await LectureAI.findOne({ courseId, lectureIndex });

    if (existing?.status === "done") {
      console.log("⚡ AI notes already cached — skipping");
      return;
    }

    await LectureAI.findOneAndUpdate(
      { courseId, lectureIndex },
      { status: "processing" },
      { upsert: true }
    );

    console.log("🛠️ Marked lecture as processing in DB");

    const course = await newCourse.findById(courseId);
    if (!course) throw new Error("Course not found");

    const lecture = course.lectures[lectureIndex];
    if (!lecture) throw new Error("Lecture not found");

    console.log("📼 Lecture video found");

    const audioUrl = getAudioUrlFromVideo(lecture.videoUrl);
    console.log("🔊 Audio URL ready");

    const transcript = await transcribeWithGladia(audioUrl);
    console.log("📄 Transcript length:", transcript?.length || 0);

    const notes = await generateNotesWithGemini(transcript);
    console.log("🧾 Notes generated");

    await LectureAI.findOneAndUpdate(
      { courseId, lectureIndex },
      { transcript, notes, status: "done" }
    );

    console.log("✅ AI notes saved successfully");

  } catch (err) {
    console.error("❌ Lecture AI error:", err.message);

    await LectureAI.findOneAndUpdate(
      { courseId, lectureIndex },
      { status: "error" }
    );
  }
};

/* ----------------------------------
   FETCH NOTES API (STUDENT SIDE)
-----------------------------------*/
export const getLectureNotes = async (req, res) => {
  const { courseId, lectureIndex } = req.params;
  const parsedIndex = Number(lectureIndex);

  if (Number.isNaN(parsedIndex)) {
    return res.status(400).json({ status: "invalid_lecture_index" });
  }

  console.log(
    `👨‍🎓 Student requested AI notes | courseId=${courseId} | lectureIndex=${parsedIndex}`
  );

  let data = await LectureAI.findOne({
    courseId,
    lectureIndex: parsedIndex,
  });

  // 🚀 lazy trigger
  if (!data) {
    console.log("🚀 No AI data found — triggering AI generation");
    processLectureAI(courseId, parsedIndex);
    return res.json({ status: "processing" });
  }

  if (data.status === "processing") {
    return res.json({ status: "processing" });
  }

  if (data.status === "error") {
    return res.json({ status: "error" });
  }

  return res.json({
    status: "done",
    notes: data.notes,
  });
};

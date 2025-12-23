import axios from "axios";


const startTranscription = async (audioUrl) => {
  const res = await axios.post(
    "https://api.gladia.io/v2/pre-recorded",
    {
      audio_url: audioUrl,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-gladia-key": process.env.GLADIA_API_KEY,
      },
    }
  );

  return res.data.result_url;
};

/**
 * Poll until transcription is done
 */
const pollForResult = async (resultUrl) => {
  while (true) {
    const res = await axios.get(resultUrl, {
      headers: {
        "x-gladia-key": process.env.GLADIA_API_KEY,
      },
    });

    if (res.data.status === "done") {
      return res.data.result.transcription.full_text;
    }

    if (res.data.status === "error") {
      throw new Error("Gladia transcription failed");
    }

    // wait 5 seconds before next poll
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
};


export const transcribeWithGladia = async (audioUrl) => {
  const resultUrl = await startTranscription(audioUrl);
  const transcript = await pollForResult(resultUrl);
  return transcript;
};

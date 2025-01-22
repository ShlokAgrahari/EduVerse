
import User from "../models/user.js";
import newCourse from "../models/course.js";
import { ApiError } from "../utils/ApiError.js";
import Message from "../models/message.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { getReceiverSocketId } from "../utils/socket.js";
import { io } from "../utils/socket.js";
export const getUserForSidebar=async(req,res)=>{
    const loggedInUserId=req.user._id;
    const userRole=req.user.role;

    try{
        if(userRole==="student"){
            const user=await User.findById(loggedInUserId).select("subscription");
  

            const courseIds=user.subscription.map(sub=>sub.courseId);
            const courses=await newCourse.find({_id:{$in:courseIds}}).select("title createdBy instructorId")

            const formattedCourses=courses.map(course=>({
                title:course.title,
                name:course.createdBy,
                _id:course.instructorId
            }))


            return res.status(200).json(formattedCourses);
        }else{
            
            const courses = await newCourse.find({ instructorId: loggedInUserId }).select("students");

            const studentList = courses.flatMap((course) =>
                course.students.map((student) => ({
                    name: student.studentName,
                    _id: student.studentId,
                }))
            );

            return res.status(200).json(studentList);
        }
    }catch(error){
        console.log("Error in chat",error);
        return res.status(500).json(ApiError(500,"error in chat"));
    }
}

export const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    }catch(error){
        console.log("Error in get Messages",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessages = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let imageUrl;
      if (image) {
        const uploadResponse = await uploadOnCloudinary(image);
        if (uploadResponse) {
          imageUrl = uploadResponse.secure_url;
        }
      }
  
      // Create a new message regardless of whether there's an image
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl || null, // Ensure `image` is null if not provided
      });
  
      await newMessage.save();

      const ReceiverSocketId=getReceiverSocketId(receiverId);
      if(ReceiverSocketId){
        io.to(ReceiverSocketId).emit("newMessage",newMessage);
      }


      res.status(201).json(newMessage); // Return the saved message
    } catch (error) {
      console.error("Error in send message:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
// /*import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import router from "./routes/user.routes.js";
// import razorpay from "razorpay"
// import { app,server } from "./utils/socket.js";

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods: ['GET', 'POST'], 
//     credentials:true,
// }))


// //middleware
// app.use(cookieParser());
// app.use(express.json({limit:"50mb"}))
// app.use(express.urlencoded({extended:true,limit:"50mb"}))
// app.use(express.static("public"))



// import  healthcheckRouter  from "./routes/healthcheck.routes.js";

// app.use("/healthcheck",healthcheckRouter)

  
// app.use("/signup",router);
// app.use("/login",router);
// app.use("/logout",router);
// app.use("/",router);
// app.use("/instructor-dashboard",router)
// app.use("/student-dashboard",router);
// app.use("/instructor/newcourse",router);
// app.use("/coursedetails/:courseId/cart",router);
// app.use("/coursedetails/:courseId",router)
// app.use("/checkout",router)
// app.use("/paymentVerification",router)
// app.use("/payment/:paymentId",router)
// app.use("/student-dashboard/cart",router)
// app.use("/student-dashboard/cart/:courseId",router);
// app.use("/my-courses",router);
// app.use("/student-dashboard/rating",router);
// app.use("/student-dashboard/comment",router);

// app.use("/lecture/:courseId",router)
// app.use("/lecture/:courseId/check",router);
// app.use("/lecture/:courseId/completed",router);

// app.use("/payment-verification",router)

// app.use("/auth/google",router);

// app.use("/dashboard/search",router)
// app.use("/student-dashboard/recommend",router);

// app.use("/messages",router)
// app.use("/messages/users",router)
// app.use("/messages/:id",router)
// app.use("/messages/send/:id",router)
// export  {app};*/

// // app.js
// import { app } from "./utils/socket.js";
// import router from "./routes/user.routes.js";
// import healthcheckRouter from "./routes/healthcheck.routes.js";

// // Routes configuration
// app.use("/healthcheck", healthcheckRouter);

// // User routes
// app.use("/signup", router);
// app.use("/login", router);
// app.use("/logout", router);
// app.use("/", router);
// app.use("/instructor-dashboard", router);
// app.use("/student-dashboard", router);
// app.use("/instructor/newcourse", router);
// app.use("/coursedetails/:courseId/cart", router);
// app.use("/coursedetails/:courseId", router);
// app.use("/checkout", router);
// app.use("/paymentVerification", router);
// app.use("/payment/:paymentId", router);
// app.use("/student-dashboard/cart", router);
// app.use("/student-dashboard/cart/:courseId", router);
// app.use("/my-courses", router);
// app.use("/student-dashboard/rating", router);
// app.use("/student-dashboard/comment", router);
// app.use("/lecture/:courseId", router);
// app.use("/payment-verification", router);
// app.use("/auth/google", router);
// app.use("/dashboard/search", router);
// app.use("/student-dashboard/recommend", router);
// app.use("/messages", router);
// app.use("/messages/users", router);
// app.use("/messages/:id", router);
// app.use("/messages/send/:id", router);
// app.use("/api-chat",router);

// app.use("/getdetail/:courseId",router);


// export { app };

/*import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Changed to match your app's CORS setting
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const userSocketMap = {}; // {userId: socketId}

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };*/

// socket.js
import { Server } from "socket.io";
import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Configure Express middleware first
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const userSocketMap = {};

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };
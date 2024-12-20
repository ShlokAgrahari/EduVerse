import { instance } from "../index.js";
import crypto from "crypto";
import CartDetail from "../models/cart.js";
import User from "../models/user.js"; // Adjust the path if necessary

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };

    // Await the creation of the order to get the actual data
    const order = await instance.orders.create(options);

    console.log(order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    console.log(req.body);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");
    console.log("signature received", razorpay_signature);
    console.log("signature generated", expectedSignature);

    if (expectedSignature === razorpay_signature) {
      // Database logic can be added here if needed
      const userId = req.user._id;
      console.log("User ID:", userId);
      const user = await User.findById(userId);
        if(!user){
            throw ApiError(401,"user does not found");
        }
      console.log(user)
      user.cart = [];
      await user.save();
      return res.redirect("http://localhost:3000/user/student-dashboard");
    } else {
      // If signatures don't match, send an error response
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

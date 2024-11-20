import { instance } from "../index.js"
import crypto from "crypto"
export const checkout = async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR"
        };

        // Await the creation of the order to get the actual data
        const order = await instance.orders.create(options);

        console.log(order);

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Error creating order"
        });
    }
};

export const paymentVerification = async (req, res) => {
    try {
        console.log(req.body)
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
 console.log("signature received",razorpay_signature)
 console.log("signature generated",expectedSignature)

  if (expectedSignature === razorpay_signature) {
    // Database comes here

   /* await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });*/

    res.redirect(
      `http://localhost:3000/student-dashboard`
    );
    /*
  } else {
    res.status(400).json({
      success: false,
    });*/
    res.status(200).json({
      success:"PAYMENT SUCCESSFULL"
    })
  }
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Error creating order"
        });
    }
};

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.js";

const getCartdetail = asyncHandler(async(req,res)=>{
    console.log("getcart function triggered");
    const userId = req.user._id;
    try {
        const detail = await User.findById(userId).select("cart");
        if(!detail){
            throw ApiError(401,"user does not found");
        }
        res.status(200).json(ApiResponse(200,detail.cart,"got cart details"));
    } catch (error) {
        console.log("cart fetch error is ",error);
    }
}); 


const deleteFromCart = asyncHandler(async(req,res)=>{
    console.log("delete cart function triggered");
    const userId = req.user._id;
    console.log(userId);
    try {
        const {_id} = req.body;
        console.log(_id);
        const userDetail = await User.findById(userId);
        if(!userDetail){
            throw ApiError(402,"user does not found");
        }

        userDetail.cart = userDetail.cart.filter((item)=> item._id.toString() != _id);
        await userDetail.save();

        return ApiResponse(200,userDetail.cart,"deleted from cart");
    } catch (error) {
        console.log("delete from cart error is ",error);
    }
})

export {getCartdetail,deleteFromCart};
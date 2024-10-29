import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthcheck=asyncHandler(async(req,res)=>{
    return res.status(200).json(ApiResponse(200,"OK","Health check passed"))
})

export {healthcheck}
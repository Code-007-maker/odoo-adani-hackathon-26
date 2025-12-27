import { asyncHandler } from "../utils/asyncHandler.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
export const verifyJWT = asyncHandler(async (req,res,next)=>{
    
    // get stored token from cookies
    // Verify the access token with jwt.verify
    // Add .user to req by using _id in decoded Token
    // update the user by deleting refresh token

try {
    const token = req.cookies?.accessToken;

if (!token) {
  throw new ApiError(401, "Access token missing");
}

const decodedToken = jwt.verify(
  token,
  process.env.ACCESS_TOKEN_SECRET
);

const user = await User.findById(decodedToken._id);

if (!user) {
  throw new ApiError(401, "Invalid Access Token");
}

req.user = user;
next();

} catch (error) {
    console.log("JWT verification error:", error.name, error.message);
    console.log(req.cookies);
    console.log(0);
    throw new ApiError(401, "Invalid Access Token");
}

})




// const generateAccessAndRefreshTokens = async (user_id)=>{   
//     try{
//         const user = await Employee.findById(user_id);

//     const accessToken = user.generateAccessToken();
//     const refreshToken = user.generateRefreshToken();

//     user.refreshToken = refreshToken;
//     await user.save({validateBeforeSave: false});

//     return {accessToken,refreshToken};}
//     catch(error){
//         throw new ApiError(500, "Error generating tokens");
//     }
// }

// const loginUser = asyncHandler(async(req,res) => {

//     //req.body -> data
//     //email
//     //find the user
//     //password check
//     //access and refresh token
//     //send cookies

//     const {email,password} = req.body;
//     if(!email)
//     {
//         throw new ApiError(400, "Email is requied")
//     }
//     const user =await Employee.findOne({email})

//     if(!user)
//     {
//         throw new ApiError("User Does Not Exists")
//     }
    
//     const isPasswordCorrect = await user.isPasswordCorrect(password);      // small u in user to provide context to current object through this keyword
//     if(!isPasswordCorrect){ 
//         throw new ApiError(401, "Incorrect Password");
//     }

//     const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

//     const loggedInUser = await Employee.findById(user._id).select("-password -refreshToken");
//     if(!loggedInUser){
//         throw new ApiError(500, "User login failed");
//     }

//     const options={
//         httpOnly:true,
//         secure:true,
//     }

//     return res.status(200).cookie("RefreshToken",refreshToken,options).cookie("AccessToken",accessToken,options).json(
//         new ApiResponse(200,{user:loggedInUser,refreshToken,accessToken},"User Logged In Successfully"))

// })

// const logoutUser = asyncHandler(async (req,res) => {
//     await User.findByIdAndUpdate(req.user._id, {$unset:{refreshToken:1}}, {new: true});
//     const options={
//         httpOnly:true,
//         secure:true,
//     }
//     return res.status(200).clearCookie("RefreshToken",options).clearCookie("AccessToken",options).json(
//         new ApiResponse(200,{},"User Logged Out Successfully")
//     )
// })
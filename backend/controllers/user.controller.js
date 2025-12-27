import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { upload, deletefile } from "../utils/cloudinary.js";
import {User} from "../models/user.model.js"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const generateAccessAndRefreshTokens = async (user_id) => {
    const user = await User.findById(user_id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};



const registerUser = asyncHandler(async (req, res) => {
                             
    const {email,fullName,password} = req.body;

    if([email,fullName,password].some(field=> field?.trim()==='')){
        throw new ApiError(401, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or:[{email}]
    })

    if(existedUser){
        throw new ApiError(401, "Email already exists");
    }

    const user=await User.create({
        fullName,
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(! createdUser){
        throw new ApiError(500, "User registration failed");
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser, "User registered successfully")
    );
})

const loginUser = asyncHandler(async(req,res) => {

    const {email,password} = req.body;
    if(!email)
    {
        throw new ApiError(400, "Email should be provided")
    }
    const user =await User.findOne({email})

    if(!user)
    {
        throw new ApiError("User Does Not Exists")
    }
    
    const isPasswordCorrect = await user.isPasswordCorrect(password);      // small u in user to provide context to current object through this keyword
    if(!isPasswordCorrect){ 
        throw new ApiError(401, "Incorrect Password");
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    if(!loggedInUser){
        throw new ApiError(500, "User login failed");
    }

    const options={
        httpOnly:true,
        secure:true,
    }

    return res.status(200).cookie("RefreshToken",refreshToken,options).cookie("AccessToken",accessToken,options).json(new ApiResponse(200,{user:loggedInUser,refreshToken,accessToken},""))
})

const logoutUser = asyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(req.user._id, {$unset:{refreshToken:1}}, {new: true});
    const options={
        httpOnly:true,
        secure:true,
    }
    return res.status(200).clearCookie("RefreshToken",options).clearCookie("AccessToken",options).json(
        new ApiResponse(200,{},"User Logged Out Successfully")
    )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const refreshCToken = req.cookies?.refreshToken || req.cookies?.RefreshToken;
        if(!refreshCToken)
        {
            console.log(1)
            throw new ApiError(401,"Unauthorized request ")
        }
        const decodedToken = await jwt.verify(refreshCToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password");
        if(!user)
        {
            console.log(2)
            throw new ApiError(401,"Invalid Refresh Token")
        }
        // compare current user refresh token with the incoming refresh token
        if(refreshCToken!==user.refreshToken)
        {
            console.log(refreshCToken);
            console.log(user.refreshToken)
            console.log(3)
            throw new ApiError(401,"Refresh token is either expired or already used")
        }
        const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id);
        user.refreshToken = refreshToken;
        const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

        // user.clearCookie("refreshToken",options)
        // user.clearCookie("accessToken",options)
        // const {accessToken,refreshToken}=
        res.status(200).cookie("refreshToken",refreshToken,options).cookie("accessToken",accessToken,options).json(
            new ApiResponse(200,{
                user,refreshToken,accessToken
            },"Access Token Refreshed Successfully")
        )
    } catch (error) {
        console.log(0)
        throw new ApiError(401,"Invalid Refresh Token")
    }
})

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} = req.body
    // User should be logged in to change password so use verify JWT middleware to validate logged in user
    const user =await User.findById(req.user?._id);
    if(!user)
    {
        throw new ApiError(401,"Invalid User")
    }
    if(!await user.isPasswordCorrect(oldPassword))
    {
        throw new ApiError(401,"Incorrect Password")
    }
    user.password=newPassword
    await user.save({validateBeforeSave:false});

    return res.status(200).json(
        new ApiResponse(200,{},"Password Changed Successfully")
    )
})

const changeAccountDetails = asyncHandler(async(req,res)=>{
    try {
        let {fullName,email} = req.body
        console.log("Full Name:", fullName);
        console.log("Email:", email);
        // console.log("User:", req.user);
        if((fullName?.trim()==="" || !fullName) && (email?.trim()==="" || !email))
        {
            throw new ApiError(401,"Either fullName or email is required")
        }
        if(email)
        {
            const existedUser = await User.findOne({email});
            if(existedUser)
            {
                throw new ApiError(401,"Email already exists")
            }
        }
        fullName=fullName?(fullName?.trim()===""?req.user.fullName:fullName): req.user.fullName;
        email=email?(email?.trim()===""?req.user.email:email): req.user.email;
        console.log("Full Name:", fullName);
        console.log("Email:", email);

        const updatedUser = await User.findByIdAndUpdate(req.user._id,{$set:{fullName,email}},{new:true}).select("-password -refreshToken")
    
        res.status(200).json(
            new ApiResponse(200,{user:updatedUser},"Account Details Updated Successfully")
        )
    } catch (error) {
        throw new ApiError(500,"Error updating account details");
    }
})

const updateUserAvatar = asyncHandler(async(req,res) =>{
    try {
        const avatarlocalPath = req.file?.path
        if(!avatarlocalPath)
        {
            throw new ApiError(401,"Error while locally uploading the files")
        }
         console.log(req.user?.avatar);
         console.log(req.user?.avatarPublicId);
        await deletefile(req.user?.avatarPublicId)
        const avatar =await upload(avatarlocalPath)
        if(!avatar)
        {
            throw new ApiError(401,"Error while uploading file on cloudinary")
        }
        const updatedUser = await User.findByIdAndUpdate(req.user._id,{$set:{avatar:avatar.url}},{new:true}).select("-password -refreshToken")
        return res.status(200).json( new ApiResponse(200,{updatedUser},"Avatar updated successfully"))
    } catch (error) {
        throw new ApiError(401,error.message || "Error while updating User Avatar")
    }
})

export { registerUser , loginUser, logoutUser, refreshAccessToken, changeCurrentPassword, changeAccountDetails, updateUserAvatar};
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  avatarUrl: {
    type: String
  },
  baseRole: {
    type: String,
    enum: ['ADMIN', 'EMPLOYEE'],
    default: 'EMPLOYEE'
  },
  roles: {
    type: [String],
    enum: ['TECHNICIAN', 'MAINTENANCE_TEAM_MANAGER', 'DEPARTMENT_MANAGER'],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  refreshToken:{
        type:String,
    }
}, {
  timestamps: true // adds createdAt and updatedAt
});

userSchema.pre("save",async function(){
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)    
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,                                                               
        fullName:this.fullName, 
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d'
    }
)
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,  
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d'
    }
)
}
const User = model('User', userSchema);

export {User};

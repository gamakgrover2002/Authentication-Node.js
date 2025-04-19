import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName:{
        type: String,
        required: true,

    },
    lastName:{
        type: String,
        required: true
    },
    role:{
        type:String,
        default:"User"

    },
    
}, {
    timestamps: true 
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

UserSchema.methods.comparePassword = async function (enteredPassword) {
    console.log(enteredPassword);
    console.log(this.password);
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    console.log(isMatch);
    return isMatch;
};
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            data: {
                username: this.username,
                role: this.role,
                firstName: this.firstName,
                lastName:this.lastName
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            data: {
                username: this.username,
                role: this.role,
            },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

const User = mongoose.model("User", UserSchema);

export default User;
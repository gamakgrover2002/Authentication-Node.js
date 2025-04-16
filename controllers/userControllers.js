import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/Users.js"; 
import { sendTokens } from "../utils/sendJwt.js";

const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
        return res.status(400).json({
            message: "User Already Exists"
        });
    }

    const newUser = new User({ username, password });
    const refreshToken = newUser.generateRefreshToken();
    const accessToken = newUser.generateAccessToken();

     newUser.refershToken = refreshToken;
     await newUser.save();
     sendTokens(res,accessToken);
    
});

const loginUser = asyncHandler(async(req,res)=>{
    const {username,password} = req.body;
    const user = await User.findOne({
        username: username
    })
    if(!user){
       return  res.status(400).json({
            message:"User does not exsist"
        })
    }
    const validatePassword = await user.comparePassword(password);
    if(!validatePassword){
        return res.status(401).json({
            message:"Password entered is incorrect"
        })
     

    }
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refershToken = refreshToken;
    await user.save();
        sendTokens(res,accessToken);
    res.json({ message: 'Login Successful', status: 200 });
})

const getNewTokens = asyncHandler(async(req,res)=>{
    const user = await User.findOne({
        username:req.user
    })
    if(!user){
       return res.status(400).json({
            message:"User Not Found",
        })
    }
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refershToken = refreshToken;
    await user.save();
    res.cookie('accessToken', accessToken, {
       httpOnly: true,
       secure: true,
       maxAge: 3600000,
   }).json({ message: 'Login Successful', status: 200 });

})
const logoutUser = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
  
    if (refreshToken) {
      // Optional: Remove the token from DB
      await Token.deleteOne({ token: refreshToken });
    }
  
    // Clear access token
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: req.secure || process.env.NODE_ENV === 'production',
      expires: new Date(0),
      path: "/",
    });
  
    // Clear refresh token
    res.cookie("refreshToken", "", {
      httpOnly: true,
      secure: req.secure || process.env.NODE_ENV === 'production',
      expires: new Date(0),
      path: "/",
    });
  
    res.status(200).json({ message: "Logout Successful" });
  });
  

  
export {registerUser,loginUser,getNewTokens,logoutUser}
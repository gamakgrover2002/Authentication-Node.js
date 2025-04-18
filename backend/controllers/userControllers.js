import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/Users.js"; 


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
     res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
    }).json({ message: 'User Created', status: 200 });
    
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
    res.cookie('accessToken', accessToken, {
       httpOnly: true,
       maxAge: 3600000,
   }).json({ message: 'Login Successful', status: 200 });
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
    res.cookie("accessToken", "", {
      httpOnly: true,       // Prevent access to cookie via JavaScript
      secure: req.secure || process.env.NODE_ENV === 'production', // Ensure it works in secure contexts (HTTPS)
      expires: new Date(0), // Set the cookie expiration date to a past date to delete it
      path: "/",            // Ensure it matches the path where the cookie was set
    });
    res.status(200).json({ message: "Logout Successful" });
});

  
export {registerUser,loginUser,getNewTokens,logoutUser}
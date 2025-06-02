import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/Users.js"; 

const cookieOptions = {
   httpOnly: true,
  secure: true,  // if you use https
  sameSite: 'Strict',  // or your cookie's sameSite setting
  path: '/'
};

const registerUser = asyncHandler(async (req, res) => {
    const { username, password,firstName,lastName } = req.body;

    if(!username || !password || !lastName || !firstName){
        res.status(400).json({
            message:"data missing please check input"
        })
    }

    const user = await User.findOne({ username });

    if (user) {
        return res.status(400).json({ message: "User Already Exists" });
    }

    const newUser = new User({ username, password,firstName,lastName });
    await newUser.save();
    const refreshToken = newUser.generateRefreshToken();
    const accessToken = newUser.generateAccessToken();
    console.log("Registered");

    res
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json({ message: 'User Created', status: 200 });
});

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password  ){
        res.status(400).json({
            message:"data missing please check input"
        })
    }
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }

    const validatePassword = await user.comparePassword(password);
    if (!validatePassword) {
        return res.status(401).json({ message: "Password entered is incorrect" });
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    
    console.log("Logined");
    res
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json({ message: 'Login Successful', status: 200 });
});

const getNewTokens = asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.user });

    if (!user) {
        return res.status(400).json({ message: "User Not Found" });
    }

    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    res
        .cookie('accessToken', accessToken, cookieOptions)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .json({ message: 'Tokens Refreshed', status: 200 });
});

const logoutUser = asyncHandler(async (req, res) => {
    res
        .cookie('accessToken', '', {
            ...cookieOptions,
            expires: new Date(0),
        })
        .cookie('refreshToken', '', {
            ...cookieOptions,
            expires: new Date(0),
        })
        .status(200)
        .json({ message: "Logout Successful" });
});
const getUser = asyncHandler(async(req,res)=>{
   const user = req.user;
   if(!user){
    return res.status(400).json({ message: "User Not Found" });
   }
   const data = await User.findOne({ username: req.user }).select('-password');
   res.status(200).json(data);
})

export { registerUser, loginUser, getNewTokens, logoutUser,getUser };

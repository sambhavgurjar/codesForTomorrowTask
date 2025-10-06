import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import AppError from "../utils/ErrorHandler.js";
import { generateToken, verifyToken } from "../utils/jwtServices.js";
import { sendMail } from "../config.js/nodemailerConfig.js";

//user registration controller
export const registerUser = asyncHandler(async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  let existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new AppError("Email already registerd", 400);
  }
  let newuser = new User({ firstName, lastName, email, password });
  await newuser.save();
  return res.status(201).json({
    success: true,
    message: "User successfully registered",
    data: null,
  });
});

//user login controller

export const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  let user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // compare hashed password and user input password
  let isMatched = await user.matchPassword(password);
  if (!isMatched) {
    throw new AppError("Invalid Pssword", 400);
  }

  //generate jwt token
  let token = generateToken({ id: user._id, email: user.email });

  return res.status(200).json({
    success: true,
    message: "User successfully logged in",
    data: {
      token,
      user: {
        email: user.email,
        id: user._id,
      },
    },
  });
});

//user detail controller

export const getUser = asyncHandler(async (req, res) => {
  //get id which added by auth middleware
  let id = req.user.id;
  if (!id) {
    throw new AppError("User is not Logged in", 401);
  }
  let user = await User.findById(id).select("-password -_id").lean();

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return res.status(200).json({
    success: true,
    message: "record fetched successfully",
    data: {
      user,
    },
  });
});


//forgot password controller

export const forgotpassword = asyncHandler(async (req, res) => {
  let { email } = req.body;

  let user = await User.findOne({ email: email });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  //generate password reset token
  let resetToken = generateToken({
    email,
    expires: Date.now() + 5 * 60 * 1000,
  });
  user.resetPassToken = resetToken;
  await user.save();

  //frontend url on which user redirect fro password reset.
  let clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
  let resetUrl = `${clientUrl}/reset-password/${resetToken}`;

  let mailOption = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "reset your password",
    html: `<p>Click <a href=${resetUrl}>here</a> to reset passwpord.Valid only for 5 minutes. </p>`,
  };

  //send mail to user with link
  await sendMail(mailOption);

  res.status(200).json({
    success: true,
    messasge: "reset link send to mail",
  });
});


//reset password controller

export const resetPassword = asyncHandler(async (req, res) => {
  let { resetToken } = req.params;
  let { password } = req.body;
  console.log(password);

  //varify token 
  let verifiedToken = verifyToken(resetToken);

  //check token expires date
  if (verifiedToken.expires < Date.now()) {
    throw new Error(" reset password token expired", 400);
  }

  let user = await User.findOne({ resetPassToken: resetToken });
  console.log();

  if (!user) {
    throw new Error("Invalid reset password Token", 400);
  }

  //reset password and token in db
  user.password = password;
  user.resetPassToken = "";
  await user.save();

  res.status(200).json({
    success: true,
    messasge: "password successfully reset",
  });
});

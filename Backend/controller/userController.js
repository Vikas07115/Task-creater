import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import User from "../models/userSchema.js"; 
import cloudinary from "cloudinary";

export const register = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("User Avatar Required", 400));
  }

  const { avatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/avif"];

  if (!allowedFormats.includes(avatar.mimetype)) {
    return next(
      new ErrorHandler("Please provide avatar in png, jpg, webp, or avif format!", 400)
    );
  }

  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return next(new ErrorHandler("Please fill the complete form", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists!", 400));
  }

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath);

    user = await User.create({
      name,
      email,
      phone,
      password,
      avatar: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(201).json({
      success: true,
      message: "User Registered",
    });
  } catch (error) {
    console.error("Cloudinary Error", error);
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }
});

export const login = catchAsyncErrors(async (req, res, next) => { // Added async here
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password"); // Added await
  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 400));
  }
  const isPasswordMatched = await user.comparePassword(password); // Added await
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  res.status(200).json({
    success: true,
    message: "User logged in!",
    user,
  });
});

export const logout = catchAsyncErrors((req, res, next) => {});

export const myProfile = catchAsyncErrors((req, res, next) => {});

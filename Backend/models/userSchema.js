import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minLength: [3, "Name must contain at least 3 characters"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  phone: {
    type: String,
    required: [true, "Please provide your phone number"],
    validate: {
      validator: (value) => validator.isMobilePhone(value, "any"),
      message: "Please provide a valid phone number",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minLength: [8, "Password must contain at least 8 characters"],
    maxLength: [32, "Password cannot exceed 32 characters"],
    select: false, // Do not return the password by default
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

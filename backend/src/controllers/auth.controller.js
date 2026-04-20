import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const sendTokenResponse = async (user, res, message) => {
  const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: message,
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      contact: user.contact,
      role: user.role,
      googleId: user.googleId,
    },
  });
};

export const register = async (req, res) => {
  const { email, password, contact, fullname, isSeller } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email or contact already exists" });
    }

    const user = await userModel.create({
      email,
      password,
      contact,
      fullname,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenResponse(user, res, "User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "No user found with this email" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    await sendTokenResponse(user, res, "User logged in successfully");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Error logging in user" });
  }
};

export const googleAuthCallback = async (req, res) => {
  const { id, displayName, emails, photos } = req.user;
  const email = emails[0].value;
  const profilePic = photos[0].value;

  let user = await userModel.findOne({ email });

  if (!user) {
    user = await userModel.create({
      email,
      fullname: displayName,
      contact: "N/A",
      googleId: id,
      role: "buyer",
    });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.redirect("http://localhost:5173/dashboard");
};

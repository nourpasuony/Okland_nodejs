import Superadmin from "../models/Auth.models.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { tokenKeys } from "../Config/token.mjs";
import { defaultCredentials } from "../../src/models/Auth.models.mjs";
import { roles } from "../config/roles.mjs";

// Helper function to create a default superadmin account
const createDefaultAccount = async () => {
  try {
    const superadmin = await Superadmin.findOne({
      username: defaultCredentials.username,
    });

    if (!superadmin) {
      const hashedPassword = await bcrypt.hash(defaultCredentials.password, 10);
      await Superadmin.create({
        username: defaultCredentials.username,
        password: hashedPassword,
        role: roles.SUPERADMIN,
      });
      console.log("Default account created successfully.");
    } else {
      console.log("Default account already exists.");
    }
  } catch (error) {
    console.error("Error creating default account:", error);
  }
};

// Helper function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    {
      username: user.username,
      id: user._id,
      roles: user.roles,
    },
    tokenKeys.secretKey,
    { expiresIn: "1h" }
  );
};

// Helper function to set the token in a cookie
const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    maxAge: 3600000, // 1 hour
    sameSite: "strict",
  });
};

// Login superadmin
export const loginSuperadmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the credentials match the default superadmin
    if (
      username === defaultCredentials.username &&
      password === defaultCredentials.password
    ) {
      let superadmin = await Superadmin.findOne({
        username: defaultCredentials.username,
      });

      // If the default superadmin doesn't exist, create it
      if (!superadmin) {
        const hashedPassword = await bcrypt.hash(defaultCredentials.password, 10);
        superadmin = await Superadmin.create({
          username: defaultCredentials.username,
          password: hashedPassword,
          role: roles.SUPERADMIN,
        });
      }

      // Generate and set the token
      const token = generateToken(superadmin);
      superadmin.token = token;
      await superadmin.save();

      setTokenCookie(res, token);
      return res.status(200).json({ message: "Login successful" });
    }

    // For non-default superadmin login
    const superadmin = await Superadmin.findOne({ username });
    if (!superadmin) {
      return res.status(404).json({ message: "Superadmin not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, superadmin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate and set the token
    const token = generateToken(superadmin);
    superadmin.token = token;
    await superadmin.save();

    setTokenCookie(res, token);
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout superadmin
export const logoutSuperadmin = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Find the superadmin and clear the token
    const superadmin = await Superadmin.findOne({
      username: defaultCredentials.username,
    });

    if (!superadmin) {
      return res.status(404).json({ message: "Superadmin not found." });
    }

    superadmin.token = null;
    await superadmin.save();

    // Clear the token cookie
    res.clearCookie("token");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Initialize the default superadmin account on startup
createDefaultAccount();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Registration Successful",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User not found",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials",
      });

    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login Successful",
      token,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

router.get("/dashboard", async (req, res) => {

  try {

    const totalUsers = await User.countDocuments();

    res.json({
      totalUsers,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }

});

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {

    try {

      const user = await User.findById(
        req.user.id
      ).select("-password");

      res.json(user);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);

router.put(
  "/profile",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        bio,
        skills,
        github,
        linkedin,
      } = req.body;

      const updatedUser =
        await User.findByIdAndUpdate(
          req.user.id,
          {
            bio,
            skills,
            github,
            linkedin,
          },
          {
            new: true,
          }
        ).select("-password");

      res.json(updatedUser);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });

    }

  }
);

module.exports = router;
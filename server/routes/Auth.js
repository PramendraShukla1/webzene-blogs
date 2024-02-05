const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
router.use(cookieParser())
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

//!Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide username, email, and password." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", status: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Unable to register user." });
  }
});


//!LOGIN ROUTE

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      jwtSecret,
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
   
    res.cookie("token",token, { httpOnly: true }).status(200).json(info);
    console.log("token is: " + res.token);
  } catch (err) {
    console.log(err);
  }
});


//!LOGOUT ROUTE

router.get("/logout", async (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({ message: "User Logout Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "error in logout" });
  }
});

//!REFETCH USER ROUTE
router.get("/refetch", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "jwt must be provided" });
  }
  await jwt.verify(token, jwtSecret, {}, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;

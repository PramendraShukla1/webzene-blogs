const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 4001;
const mongoDB = process.env.MONGODB_URL;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

const authRout = require("./routes/Auth.js");
const userRoute = require("./routes/Users.js");
const postRoute = require("./routes/Posts.js");
const commentRoute = require("./routes/Comments.js");

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//! Express Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//!MongoDB Server
mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

//! Authorization Routes
app.use("/api/auth", authRout);

//!Users Routes
app.use("/api/users", userRoute);

//!Post Routes
app.use("/api/posts", postRoute);

//!Comments Routes
app.use("/api/comments", commentRoute);

//! Image upload functionality
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    //fn(null,"image1.jpg")
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  //console.log(req.body)
  res.status(200).json("Image has been uploaded successfully");
});

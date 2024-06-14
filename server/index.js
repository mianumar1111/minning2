const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const MinningModel = require("./model/model");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());

const secretKey = "abc@123&567";

mongoose
  .connect(
    "mongodb+srv://mianumar1111:1234%405678@project1.bppcdpc.mongodb.net/minningdata",
    {}
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const port = 5000;

app.get("/", (req, res) => {
  res.send("abc");
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await MinningModel.findOne({ email });
    if (existingUser) {
      return res.json("User already exists");
    }
    const newUser = new MinningModel({ name, email, password });
    await newUser.save();
    return res.json("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.json("Error while creating user ");
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  MinningModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ ...user }, secretKey, { expiresIn: "1h" });
        res.cookie("token", token);
        res.json(user);
      } else {
        res.json("Password Incorrect");
      }
    } else {
      res.json("User not found");
    }
  });
});

app.put("/updateScore", async (req, res) => {
  const { email, score } = req.body;
  const updatedUser = await MinningModel.findOneAndUpdate(
    { email },
    { $set: { score } },
    { new: true }
  );

  if (updatedUser) {
    res.json({
      message: "Score updated successfully",
      user: updatedUser,
      score: updatedUser.score,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.get("/user/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const user = await MinningModel.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(500).json("Error fetching user data");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

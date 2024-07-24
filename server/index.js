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
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    credentials: true // Allow cookies and authorization headers
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

var port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/getAll", async (req, res) => {
  const allUsers = await MinningModel.find();
  res.json(allUsers);
});

app.get("/getFriends", async (req, res) => {
  const { email } = req.query;
  try {
    const existingUser = await MinningModel.findOne({ email });
    if (existingUser) {
      res.json(existingUser.refer);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password, refer } = req.body;
  try {
    const existingUser = await MinningModel.findOne({ email });
    const existingUserName = await MinningModel.findOne({ name: name });
    if (existingUser) {
      return res.json("User already exists");
    } else if (existingUserName) {
      return res.json("username Already exist");
    } else if (refer !== null) {
      const existingUser = await MinningModel.findOne({ name: refer });
      if (!existingUser) {
        return res.json("Provided refer user does not Exist");
      } else {
        const newUser = new MinningModel({ name, email, password });
        await newUser.save();
        return res.json(newUser);
      }
    } else {
      const newUser = new MinningModel({ name, email, password });
      await newUser.save();
      return res.json(newUser);
    }
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
        res.json(user);
      } else {
        res.json("Password Incorrect");
      }
    } else {
      res.json("User not found");
    }
  });
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

app.put("/addrefer", async (req, res) => {
  const { refer, username } = req.body;
  try {
    const updatedUser = await MinningModel.findOneAndUpdate(
      { name: refer },
      {
        $push: { refer: username },
        $inc: { score: 0.2 },
      },
      { new: true }
    );
    if (updatedUser) {
      res.json({
        message: "Refer updated successfully",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ message: "Refer user not found" });
    }
  } catch (error) {
    res.status(500).json("Error updating refer");
  }
});

const activeIntervals = {};

app.post("/approve", async (req, res) => {
  const { invested, email } = req.body;

  try {
    const user = await MinningModel.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found`);
      return res.status(404).json({ message: "User not found" });
    }

    const increment = user.T_invested * 0.0025;
    console.log(`Calculated increment for user ${email}: ${increment}`);

    if (activeIntervals[email]) {
      clearInterval(activeIntervals[email]);
      console.log(`Cleared existing interval for user ${email}`);
    }

    activeIntervals[email] = setInterval(async () => {
      try {
        const result = await MinningModel.updateOne(
          { email },
          { $inc: { score: increment } }
        );
        console.log(`Updated score for user ${email} by ${increment}`, result);
      } catch (error) {
        console.error(`Error updating score for user ${email}:`, error);
      }
    }, 12 * 60 * 60 * 1000);

    console.log(`Set interval to update score for user ${email} every second`);

    const resetResult = await MinningModel.updateOne(
      { email },
      { $set: { isSubmit: false, order_placed: "No", invested: 0, orderNo: 0 } }
    );
    console.log(`Updated user ${email} with reset data`, resetResult);

    res.json({ message: "Plan approved and score updates scheduled" });
  } catch (error) {
    console.error("Error in /approve endpoint:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/logout", (req, res) => {
  const { email } = req.body;
  res.json({ message: "User logged out" });
});

app.put("/addOrder", async (req, res) => {
  const { email, orderNo, plan } = req.body;
  try {
    console.log(
      `Received request to update order for email: ${email} with order number: ${orderNo}`
    );

    const updatedUser = await MinningModel.findOneAndUpdate(
      { email: email },
      {
        $set: {
          orderNo: orderNo,
          isSubmit: true,
          invested: plan,
          order_placed: "Yes",
        },
        $inc: { T_invested: plan },
      },
      { new: true }
    );

    if (updatedUser) {
      res.json({
        message: "Order number updated successfully",
        user: updatedUser,
      });
    } else {
      console.error(`User with email ${email} not found`);
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating order number:", error);
    res.status(500).json("Error updating order number");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

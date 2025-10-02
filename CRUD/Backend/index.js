import express from "express";
import { connectDb } from "./config/db.js";
import Studentdata from "./models/User.js";
import "dotenv/config";

const app = express();
connectDb();

const PORT = process.env.PORT || 80;
app.use(express.json());

app.get("/api/user", async (req, res) => {
  try {
    const users = await Studentdata.find();
    if (!users) {
      res
        .status(204)
        .json({ message: "Successfull,but there is no content to return" });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/", async (req, res) => {
  res.send("pipeline is working now. but the issue is server is not pulling latest code.! and i am trying this many times now i am changing folder path in script");
});

app.post("/api/users", async (req, res) => {
  console.log("Deepesh");
  try {
    const { name, email, dob, gender, city, state } = req.body;

    const ExistingUser = await Studentdata.findOne({ email });
    if (ExistingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const newStudent = new Studentdata({
      name,
      email,
      dob,
      gender,
      city,
      state,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json({ message: "User added", student: savedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/users/:id", async (req, res) => {
  console.log("Deepesh");
  try {
    const { id } = req.params;
    const { name, email, dob, gender, city, state } = req.body;

    const updatedUser = await Studentdata.findByIdAndUpdate(
      id,
      { name, email, dob, gender, city, state },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Studentdata.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted", user: deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Your Backend is runnig at port ${PORT}`);
});

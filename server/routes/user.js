import express from "express";
const routes = express.Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = "NOTESAPI";

// /user/signup
routes.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log(password);

    const hashedPassoword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email: email,
      password: hashedPassoword,
      username: username,
    });
    res.status(201).json({ user: result });
  } catch (error) {
    console.log(error.message);
  }
});

routes.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: existingUser._id }, SECRET_KEY);
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

export default routes;

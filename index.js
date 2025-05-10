const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const Users = require("./models/users");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.post("/user", async (req, res) => {
  try {
    const { name, lastName, email } = req.body;
    if (!name || !lastName || !email) {
      return res.status(400).json("name , lastName and email are required");
    }

    const user = new Users({ name, lastName, email });
    await user.save();
    if (!user) {
      return res.status(400).json("problem when i create new user");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("InternalError ");
  }
});

app.get("/user", async (req, res) => {
  try {
    const users = await Users.find();
    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json("InternalError ");
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }
    const user = await Users.findById(id);
    if (!user) {
      throw new Error("there is no user with this id");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("InternalError ");
  }
});

app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, email } = req.body;
    if (!id) {
      throw new Error("id is required");
    }
    if (!name || !lastName || !email) {
      throw new Error("name , lastName and email are required");
    }
    const user = await Users.findByIdAndUpdate(
      id,
      { name, lastName, email },
      { new: true }
    );

    if (!user) {
      throw new Error("there is no user with this id");
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("InternalError ");
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("id is required");
    }

    const user = await Users.findByIdAndDelete(id);

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("InternalError ");
  }
});

app.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});

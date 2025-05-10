const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "foulen" },
  lastName: { type: String, required: true, default: "benfoulen" },
  email: { type: String, required: true },
});

const Users = mongoose.model("user", userSchema);

module.exports = Users;

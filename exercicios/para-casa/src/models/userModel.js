const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: mongoose.objectId,
  username: {
    type: String,
    required: true,
    validate: [usernameValidator, "Username already taken!"],
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

const usernameValidator = async (val) => {
  const count = await User.countDocuments({ username: val });
  return !count;
};

module.exports = { User, userSchema };

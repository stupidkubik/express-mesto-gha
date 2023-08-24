const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  caption: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      name: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("user", userSchema);

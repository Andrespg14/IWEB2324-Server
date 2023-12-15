const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contacts: [
      {
        type: String,
        required: false,
      },
    ],
    position: {
      lat: {
        type: Number,
      },
      lon: {
        type: Number,
      },
    },
    image: {
      type: String,
    },
  },
  { collection: "User", versionKey: false }
);

module.exports = mongoose.model("User", userSchema);

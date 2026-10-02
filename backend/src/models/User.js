const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["vendor", "citizen"],
      default: "vendor",
    },

    preferredLanguage: {
      type: String,
      enum: ["en", "hi", "bn", "pa", "ta", "te"],
      default: "en",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
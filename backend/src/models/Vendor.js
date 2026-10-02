const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    vendorName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "food",
        "fruit",
        "vegetable",
        "tea",
        "clothing",
        "flower",
        "other",
      ],
      default: "other",
    },

    phone: {
      type: String,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
    },

    verificationStatus: {
      type: String,
      enum: ["unverified", "partially_verified", "verified"],
      default: "unverified",
    },

    location: {
      latitude: { type: Number },
      longitude: { type: Number },
      coordinates: {
        type: [Number],
        default: undefined,
      },
      checkedIn: {
        type: Boolean,
        default: false,
      },
      checkedInAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

vendorSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("Vendor", vendorSchema);
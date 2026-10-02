const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Same citizen same vendor ko baar-baar favourite nahi kar sakta
favouriteSchema.index(
  { citizenId: 1, vendorId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Favourite", favouriteSchema);
const Favourite = require("../models/Favourite");
const Vendor = require("../models/Vendor");

// Add vendor to favourites
const addFavourite = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    const existingFavourite = await Favourite.findOne({
      citizenId: req.user.userId,
      vendorId,
    });

    if (existingFavourite) {
      return res.status(400).json({
        message: "Vendor already saved",
      });
    }

    const favourite = await Favourite.create({
      citizenId: req.user.userId,
      vendorId,
    });

    res.status(201).json({
      message: "Vendor saved successfully",
      favourite,
    });
  } catch (error) {
    console.error("Add favourite error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Remove vendor from favourites
const removeFavourite = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const favourite = await Favourite.findOneAndDelete({
      citizenId: req.user.userId,
      vendorId,
    });

    if (!favourite) {
      return res.status(404).json({
        message: "Vendor is not saved",
      });
    }

    res.status(200).json({
      message: "Vendor removed from saved list",
    });
  } catch (error) {
    console.error("Remove favourite error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get citizen's saved vendors
const getMyFavourites = async (req, res) => {
  try {
    const favourites = await Favourite.find({
      citizenId: req.user.userId,
    })
      .populate(
        "vendorId",
        "vendorName category phone address verificationStatus location"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: favourites.length,
      favourites,
    });
  } catch (error) {
    console.error("Get favourites error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  addFavourite,
  removeFavourite,
  getMyFavourites,
};
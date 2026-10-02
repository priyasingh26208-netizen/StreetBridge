const Vendor = require("../models/Vendor");
const User = require("../models/User");

// CREATE VENDOR PROFILE
const createVendor = async (req, res) => {
  try {
    const { vendorName, category, phone, address, location } = req.body;

    if (!vendorName) {
      return res.status(400).json({
        message: "Vendor name is required",
      });
    }

    // Check if vendor profile already exists
    const existingVendor = await Vendor.findOne({
      userId: req.user.userId,
    });

    if (existingVendor) {
      return res.status(409).json({
        message: "Vendor profile already exists",
      });
    }

    const vendor = await Vendor.create({
      userId: req.user.userId,
      vendorName,
      category,
      phone,
      address,
      location,
    });

    res.status(201).json({
      message: "Vendor profile created successfully",
      vendor,
    });
  } catch (error) {
    console.error("Create vendor error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET VENDOR PROFILE
const getVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    }).populate("userId", "name email role preferredLanguage");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    res.status(200).json({
      vendor,
    });
  } catch (error) {
    console.error("Get vendor error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// UPDATE VENDOR PROFILE
const updateVendor = async (req, res) => {
  try {
    const {
      vendorName,
      category,
      phone,
      address,
      location,
      preferredLanguage,
    } = req.body;

    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    if (vendorName !== undefined) vendor.vendorName = vendorName;
    if (category !== undefined) vendor.category = category;
    if (phone !== undefined) vendor.phone = phone;
    if (address !== undefined) vendor.address = address;
    if (location !== undefined) vendor.location = location;

    if (preferredLanguage !== undefined) {
      const user = await User.findById(req.user.userId);

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      user.preferredLanguage = preferredLanguage;
      await user.save();
    }

    await vendor.save();

    res.status(200).json({
      message: "Vendor profile updated successfully",
      vendor,
    });
  } catch (error) {
    console.error("Update vendor error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).select(
      "vendorName category phone address verificationStatus location"
    );

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.status(200).json(vendor);
  } catch (error) {
    console.error("Get vendor by ID error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET ALL / SEARCH / FILTER VENDORS
const getAllVendors = async (req, res) => {
  try {
    const { search, category, verificationStatus } = req.query;

    const filter = {};

    // Search by vendor name
    if (search) {
      filter.vendorName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter by category
    if (category) {
      filter.category = category.toLowerCase();
    }

    // Filter by verification status
    if (verificationStatus) {
      filter.verificationStatus = verificationStatus.toLowerCase();
    }

    const vendors = await Vendor.find(filter).select(
      "vendorName category phone address verificationStatus location"
    );

    res.status(200).json({
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    console.error("Get vendors error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET NEARBY VENDORS
const getNearbyVendors = async (req, res) => {
  try {
    const { latitude, longitude, radius = 5000 } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);
    const maxDistance = Number(radius);

    if (isNaN(lat) || isNaN(lng) || isNaN(maxDistance)) {
      return res.status(400).json({
        message: "Latitude, longitude and radius must be valid numbers",
      });
    }

    const vendors = await Vendor.find({
      "location.coordinates": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          $maxDistance: maxDistance,
        },
      },
    }).select(
      "vendorName category phone address verificationStatus location"
    );

    res.status(200).json({
      count: vendors.length,
      vendors,
    });
  } catch (error) {
    console.error("Get nearby vendors error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const checkInVendor = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({
        message: "Latitude and longitude must be valid numbers",
      });
    }

    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    vendor.location = {
      latitude: lat,
      longitude: lng,
      coordinates: [lng, lat],
      checkedIn: true,
      checkedInAt: new Date(),
    };

    await vendor.save();

    res.status(200).json({
      message: "Vendor checked in successfully",
      location: vendor.location,
    });
  } catch (error) {
    console.error("Check-in error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const checkOutVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    vendor.location.checkedIn = false;
    vendor.location.checkedInAt = null;

    await vendor.save();

    res.status(200).json({
      message: "Vendor checked out successfully",
      location: vendor.location,
    });
  } catch (error) {
    console.error("Check-out error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getCheckInStatus = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    }).select("vendorName location");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    res.status(200).json({
      vendorName: vendor.vendorName,
      checkedIn: vendor.location?.checkedIn || false,
      checkedInAt: vendor.location?.checkedInAt || null,
      latitude: vendor.location?.latitude || null,
      longitude: vendor.location?.longitude || null,
    });
  } catch (error) {
    console.error("Check-in status error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = {
  createVendor,
  getVendor,
  updateVendor,
  getAllVendors,
  getVendorById,
  getNearbyVendors,
  checkInVendor,
  checkOutVendor,
  getCheckInStatus,
};
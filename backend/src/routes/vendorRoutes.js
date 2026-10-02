const express = require("express");

const {
  createVendor,
  getVendor,
  updateVendor,
  getAllVendors,
  getVendorById,
  getNearbyVendors,
  checkInVendor,
  checkOutVendor,
  getCheckInStatus,
} = require("../controllers/vendorController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createVendor);

router.get("/me", protect, getVendor);

router.put("/me", protect, updateVendor);

router.put("/check-in", protect, checkInVendor);

router.put("/check-out", protect, checkOutVendor);

router.get("/check-in-status", protect, getCheckInStatus);

router.get("/nearby", getNearbyVendors);

router.get("/:id", getVendorById);

router.get("/", getAllVendors);

module.exports = router;
const express = require("express");

const {
  getVerificationStatus,
  getPendingDocuments,
  approveDocument,
  rejectDocument,
} = require("../controllers/verificationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get logged-in vendor's verification status
router.get("/status", protect, getVerificationStatus);
router.get("/pending", protect, getPendingDocuments);
router.put("/:id/approve", protect, approveDocument);
router.put("/:id/reject", protect, rejectDocument);

module.exports = router;
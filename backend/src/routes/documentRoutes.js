const express = require("express");

const {
  uploadDocument,
  getMyDocuments,
  deleteDocument,
  validateDocumentName,
  validateDocumentExpiry,
  getDocumentValidationSummary,
} = require("../controllers/documentController");

const protect = require("../middleware/authMiddleware");
const upload = require("../config/upload");

const router = express.Router();

// Upload document
router.post(
  "/",
  protect,
  upload.single("document"),
  uploadDocument
);

// Get my documents
router.get(
  "/me",
  protect,
  getMyDocuments
);

router.post(
  "/validate-name",
  protect,
  validateDocumentName
);

router.post(
  "/validate-expiry",
  protect,
  validateDocumentExpiry
);

router.post(
  "/validate",
  protect,
  getDocumentValidationSummary
);

// Delete document
router.delete(
  "/:id",
  protect,
  deleteDocument
);

module.exports = router;
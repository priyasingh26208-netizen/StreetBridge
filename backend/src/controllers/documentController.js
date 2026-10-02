const Document = require("../models/Document");
const Vendor = require("../models/Vendor");
const crypto = require("crypto");
const fs = require("fs");

const normalizeName = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
};

// UPLOAD DOCUMENT
const uploadDocument = async (req, res) => {
  try {
    const { documentType } = req.body;

    if (!documentType) {
      return res.status(400).json({
        message: "Document type is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a file",
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

    // Read uploaded file
    const fileBuffer = fs.readFileSync(req.file.path);

    // Generate SHA-256 hash
    const fileHash = crypto
      .createHash("sha256")
      .update(fileBuffer)
      .digest("hex");

    // Check if the same document already exists
    const existingDocument = await Document.findOne({
      fileHash,
    });

    console.log("New file hash:", fileHash);
    console.log("Existing document:", existingDocument);

    if (existingDocument) {
      // Delete the newly uploaded duplicate file
      fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "This document has already been uploaded",
      });
    }

    const document = await Document.create({
      vendorId: vendor._id,
      documentType,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileHash,
    });

    res.status(201).json({
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error("Upload document error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET MY DOCUMENTS
const getMyDocuments = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    const documents = await Document.find({
      vendorId: vendor._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      documents,
    });
  } catch (error) {
    console.error("Get documents error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// DELETE DOCUMENT
const deleteDocument = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    });

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    const document = await Document.findOne({
      _id: req.params.id,
      vendorId: vendor._id,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    await document.deleteOne();

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("Delete document error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const validateDocumentName = async (req, res) => {
  try {
    const { extractedName } = req.body;

    if (!extractedName) {
      return res.status(400).json({
        message: "Extracted name is required",
      });
    }

    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    }).populate("userId", "name");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    const vendorName = vendor.userId.name;

    const normalizedVendorName = normalizeName(vendorName);
    const normalizedExtractedName = normalizeName(extractedName);

    const nameMatch =
    normalizedVendorName === normalizedExtractedName ||
    normalizedVendorName.includes(normalizedExtractedName) ||
    normalizedExtractedName.includes(normalizedVendorName);
    
    res.status(200).json({
      vendorName,
      extractedName,
      nameMatch,
    });
  } catch (error) {
    console.error("Document name validation error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const validateDocumentExpiry = async (req, res) => {
  try {
    const { expiryDate } = req.body;

    if (!expiryDate) {
      return res.status(400).json({
        message: "Expiry date is required",
      });
    }

    const expiry = new Date(expiryDate);

    if (isNaN(expiry.getTime())) {
      return res.status(400).json({
        message: "Invalid expiry date",
      });
    }

    const today = new Date();

    // Compare only dates, not time
    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const isExpired = expiry < today;

    res.status(200).json({
      expiryDate,
      isExpired,
      status: isExpired ? "expired" : "valid",
    });
  } catch (error) {
    console.error("Document expiry validation error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getDocumentValidationSummary = async (req, res) => {
  try {
    const { documentId, extractedName, expiryDate } = req.body;

    if (!documentId || !extractedName || !expiryDate) {
      return res.status(400).json({
        message: "Document ID, extracted name and expiry date are required",
      });
    }

    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    }).populate("userId", "name");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    const document = await Document.findOne({
      _id: documentId,
      vendorId: vendor._id,
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // NAME CHECK
    const vendorName = normalizeName(vendor.userId.name);
    const documentName = normalizeName(extractedName);

    const nameMatch =
      vendorName === documentName ||
      vendorName.includes(documentName) ||
      documentName.includes(vendorName);

    // EXPIRY CHECK
    const expiry = new Date(expiryDate);

    if (isNaN(expiry.getTime())) {
      return res.status(400).json({
        message: "Invalid expiry date",
      });
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    expiry.setHours(0, 0, 0, 0);

    const expiryValid = expiry >= today;

    // OVERALL RESULT
    const documentValid = nameMatch && expiryValid;

    // UPDATE DOCUMENT STATUS
    document.status = documentValid ? "verified" : "rejected";

    await document.save();

    // UPDATE VENDOR VERIFICATION STATUS
    if (documentValid) {
      vendor.verificationStatus = "verified";
    } else {
      vendor.verificationStatus = "partially_verified";
    }

    await vendor.save();

    res.status(200).json({
      vendorName: vendor.userId.name,
      extractedName,
      expiryDate,
      nameMatch,
      expiryValid,
      documentValid,
      documentStatus: document.status,
      vendorVerificationStatus: vendor.verificationStatus,
    });
  } catch (error) {
    console.error(
      "Document validation summary error:",
      error.message
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  uploadDocument,
  getMyDocuments,
  deleteDocument,
  validateDocumentName,
  validateDocumentExpiry,
  getDocumentValidationSummary,
};
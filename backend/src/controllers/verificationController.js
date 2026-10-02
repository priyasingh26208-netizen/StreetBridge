const Vendor = require("../models/Vendor");
const Document = require("../models/Document");

// GET VERIFICATION STATUS
const getVerificationStatus = async (req, res) => {
  try {
    const vendor = await Vendor.findOne({
      userId: req.user.userId,
    }).select("vendorName verificationStatus");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor profile not found",
      });
    }

    res.status(200).json({
      vendorName: vendor.vendorName,
      verificationStatus: vendor.verificationStatus,
    });
  } catch (error) {
    console.error("Verification status error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET ALL PENDING DOCUMENTS
const getPendingDocuments = async (req, res) => {
  try {
    const documents = await Document.find({
      status: "pending",
    })
      .populate("vendorId", "vendorName category phone address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: documents.length,
      documents,
    });
  } catch (error) {
    console.error("Get pending documents error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// APPROVE DOCUMENT
const approveDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    // Update document status
    document.status = "verified";
    await document.save();

    // Update vendor verification status
    const vendor = await Vendor.findById(document.vendorId);

    if (vendor) {
      vendor.verificationStatus = "verified";
      await vendor.save();
    }

    res.status(200).json({
      message: "Document verified successfully",
      document,
      vendorVerificationStatus: vendor
        ? vendor.verificationStatus
        : null,
    });
  } catch (error) {
    console.error("Approve document error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// REJECT DOCUMENT
const rejectDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    document.status = "rejected";
    await document.save();

    // Update vendor verification status
    const vendor = await Vendor.findById(document.vendorId);

    if (vendor) {
      vendor.verificationStatus = "partially_verified";
      await vendor.save();
    }

    res.status(200).json({
      message: "Document rejected successfully",
      document,
      vendorVerificationStatus: vendor
        ? vendor.verificationStatus
        : null,
    });
  } catch (error) {
    console.error("Reject document error:", error.message);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  getVerificationStatus,
  getPendingDocuments,
  approveDocument,
  rejectDocument,
};
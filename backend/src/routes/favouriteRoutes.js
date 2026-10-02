const express = require("express");

const {
  addFavourite,
  removeFavourite,
  getMyFavourites,
} = require("../controllers/favouriteController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", protect, getMyFavourites);
router.post("/:vendorId", protect, addFavourite);
router.delete("/:vendorId", protect, removeFavourite);

module.exports = router;
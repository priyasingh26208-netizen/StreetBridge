const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const documentRoutes = require("./routes/documentRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/auth", authRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/verification", verificationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/favourites", favouriteRoutes);


// Database
connectDB();

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "StreetBridge Backend is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`StreetBridge server running on port ${PORT}`);
});
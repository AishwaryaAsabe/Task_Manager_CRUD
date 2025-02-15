import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  throw new Error("❌ MONGODB_URI is not set in environment variables.");
}

const connectToDatabase = async () => {
  // Check if already connected
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ Already connected to MongoDB");
    return;
  }

  try {
    // Connect to MongoDB with options
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds to find a server
      socketTimeoutMS: 45000, // 45 seconds timeout for operations
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1); // Exit if connection fails
  }
};

export default connectToDatabase;
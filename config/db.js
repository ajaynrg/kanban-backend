import mongoose from "mongoose";

const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    // skip real MongoDB connection, mongodb-memory-server handles it
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI,{dbName:'kanbanDB'});
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;

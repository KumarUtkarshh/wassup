import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("connected");
  } catch (error) {
    console.error("error ", error);
    process.exit(1);
  }
};

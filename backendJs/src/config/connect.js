import mongoose from "mongoose";

const connectDB = (url) => {
  console.log("Mongodb connected");
  return mongoose.connect(url);
};

export default connectDB;

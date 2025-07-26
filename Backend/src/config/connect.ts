import mongoose from "mongoose";

const connectDB = (url: any) => {
  console.log("Mongodb connected");
  return mongoose.connect(url);
};

export default connectDB;

import mongoose from "mongoose";
// import { MONGO_DB, MONGO_PASSWORD, MONGO_USER } from "./config.js"

export const connectDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://" + MONGO_USER + ":" + MONGO_PASSWORD + "@cluster0.bchbyio.mongodb.net/" + MONGO_DB + "?retryWrites=true&w=majority");
    } catch (error) {
      console.error(error);
    }
  };
  
  mongoose.connection.on("connected", () => {
    console.log("Mongodb is connected:", mongoose.connection.db.databaseName);
  });
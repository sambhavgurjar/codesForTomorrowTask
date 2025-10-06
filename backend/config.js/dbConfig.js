import mongoose from "mongoose";

const mongoUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/test-db";

//mongodb configration
async function dbConnect() {
  try {
    let db = await mongoose.connect(mongoUrl);
    console.log(`database connected successfully DB- ${db.connection.name}`);
  } catch (err) {
    console.log("failed to connect database",err);
  }
}

export default dbConnect;

// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config(); 

// const mongoURL = process.env.MONGO_URI

// const connectDB = async () => {
//   try {
//     await mongoose.connect(mongoURL);
//     // console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ DB Error:", err.message);
//     process.exit(1);
//   }
// };

// export default connectDB;






import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURL: string = process.env.MONGO_URI as string;

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURL);
    console.log("✅ MongoDB Connected");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ DB Error:", err.message);
    } else {
      console.error("❌ Unknown DB Error:", err);
    }
    process.exit(1);
  }
};

export default connectDB;

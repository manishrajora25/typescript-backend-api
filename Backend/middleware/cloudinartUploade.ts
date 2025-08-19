// // middleware/cloudinaryUpload.js
// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

// // ✅ Cloudinary config (values .env me honi chahiye)
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ✅ Storage setup
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "products", // cloudinary folder name
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// // ✅ Multer upload instance
// export const uploadCloud = multer({ storage });






import multer, { StorageEngine } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Cloudinary config (values .env file me hongi)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// ✅ Storage setup
const storage: StorageEngine = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  } as {
    folder: string;
    allowed_formats: string[];
  },
});

// ✅ Multer upload instance
export const uploadCloud = multer({ storage });

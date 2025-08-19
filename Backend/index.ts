// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";
// import productRoute from "./routes/productRouter.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;


// const allowedOrigins = [
//   process.env.DEPLOYED_FRONTEND_URL,
//   process.env.LOCAL_URL,
//   "http://localhost:5173",
//   "http://127.0.0.1:5500",
// ];

// const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin) || localhostRegex.test(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());


// app.get("/", (req, res) => {
//   res.json({ status: "OK", message: "API is running" });
// });

// app.use("/product", productRoute);


// app.use((req, res) => {
//   res.status(404).json({ error: "Not Found" });
// });


// app.use((err, req, res, next) => {
//   console.error("Error:", err);
//   res.status(500).json({ error: err.message || "Internal Server Error" });
// });


// (async () => {
//   try {
//     await connectDB();
//     app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
//   } catch (err) {
//     console.error("DB Connection Failed:", err);
//     process.exit(1);
//   }
// })();







import express, { Application, Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db";   // ✅ .js mat likho
import productRoute from "./routes/productRouter";  // ✅ .js mat likho

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;

// ✅ Allowed Origins
const allowedOrigins: string[] = [
  process.env.DEPLOYED_FRONTEND_URL || "",
  process.env.LOCAL_URL || "",
  "http://localhost:5173",
  "http://127.0.0.1:5500",
];

const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin || "") || localhostRegex.test(origin || "")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "API is running 🚀" });
});

// ✅ Product routes
app.use("/product", productRoute);

// 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// ✅ Start server after DB connect
(async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
})();

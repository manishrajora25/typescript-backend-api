// // routes/productRoutes.js
// import express from "express";
// import { createProduct } from "../controllers/productController.js";
// import { uploadCloud } from "../middleware/cloudinartUploade.js";

// const router = express.Router();

// // POST /product/add
// router.post("/add", uploadCloud.single("image"), createProduct);

// export default router;





import express, { Request, Response } from "express";
import { createProduct } from "../controllers/productController";
import { uploadCloud } from "../middleware/cloudinartUploade";

const router = express.Router();

// POST /product/add
router.post(
  "/add",
  uploadCloud.single("image"),
  (req: Request, res: Response) => {
    // Controller ko call
    createProduct(req, res);
  }
);

export default router;

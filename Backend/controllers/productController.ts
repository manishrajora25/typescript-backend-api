// controllers/productController.js
import Product from "../models/product";

export const createProduct = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : "";

    // ✅ attributes handle
    let attributes = [];
    if (req.body.attributes) {
      try {
        attributes = JSON.parse(req.body.attributes);
      } catch (err) {
        return res.status(400).json({ error: "Invalid attributes format" });
      }
    }

    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      category: req.body.category,
      quantity: req.body.quantity,
      originalPrice: req.body.originalPrice,
      discountedPrice: req.body.discountedPrice,
      description: req.body.description,
      image: imageUrl,
      attributes,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "✅ Product created successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error("Product Error:", err);
    res.status(500).json({ error: "Product creation failed", details: err.message });
  }
};

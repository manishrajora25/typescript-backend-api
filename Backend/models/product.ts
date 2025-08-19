// // models/Product.js
// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     slug: { type: String, required: true },
//     category: { type: String },
//     image: { type: String, required: true },
//     quantity: { type: Number, default: 0 },
//     originalPrice: { type: Number, required: true },
//     discountedPrice: { type: Number },
//     description: { type: String },
//     attributes: [
//       {
//         key: { type: String },
//         value: { type: String },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);
// export default Product;








// models/Product.ts
import mongoose, { Document, Schema, Model } from "mongoose";

// Product ke liye TypeScript interface
export interface IAttribute {
  key: string;
  value: string;
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  category?: string;
  image: string;
  quantity: number;
  originalPrice: number;
  discountedPrice?: number;
  description?: string;
  attributes?: IAttribute[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Mongoose schema
const productSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: String },
    image: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    description: { type: String },
    attributes: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// Model banate waqt type pass karte hain
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", productSchema);

export default Product;

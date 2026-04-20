import { Mongoose, Schema } from "mongoose";
import productModel from "../models/product.model.js";
import { uploadImage } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const seller = req.user; // Assuming the authenticated user is available in req.user

    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadImage({
          buffer: file.buffer,
          filename: file.originalname,
        });
      }),
    );

    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product image is required",
      });
    }

    const product = await productModel.create({
      title,
      description,
      price: {
        amount: parseFloat(priceAmount), // Ensure price is stored as a number
        currency: priceCurrency || "INR", // You can make this dynamic based on your requirements
      },
      images,
      sellerId: seller.id, // Store the seller's ID in the product document
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ success: false, message: "Error creating product" });
  }
};

export const getSellerProducts = async (req, res) => {
  try {
    const seller = req.user; // Assuming the authenticated user is available in req.user

    const products = await productModel.find({ sellerId: seller.id });

    res.status(200).json({
      success: true,
      message: "Seller products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching seller products" });
  }
};

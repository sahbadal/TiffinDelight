import { v2 as cloudinary } from "cloudinary";
import Product from "../models/ProductModel.js";

//add product: //api/product/add

export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    let images = req.files;

    let imageUrl = await Promise.all(
      images.map(async (image) => {
        let result = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await Product.create({
      ...productData,
      image: imageUrl,
    });
    res.status(201).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get all products: /api/product/list

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("provider", "kitchenName");
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get product by id: /api/product/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//change product inStock status: /api/product/stock
export const changeProductStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await Product.findByIdAndUpdate(id, { inStock });
    res.status(200).json({
      success: true,
      message: "stock updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Product = require("../models/productsSchema");

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = path.join(__dirname, "uploads"); // Use an absolute path
    console.log("Destination Path:", dest); // Log the destination path
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/product", (req, res) => {
  res.send("Hello World");
});

router.post("/postProduct", upload.single("pimage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image file provided" });
  }
  const { pname, ptitle, pdescription, pprice, pcategory, quantity } = req.body;
  const pimage = req.file.filename;

  try {
    const newProduct = new Product({
      pname,
      ptitle,
      pdescription,
      pprice,
      quantity,
      pimage,
      pcategory,
    });
    await newProduct.save();
    console.log("New Product:", newProduct); // Log the product after it's been saved
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/fetchProduct/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
});

router.get("/fetchProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put(
  "/updateProduct/:productId",
  upload.single("pimage"),
  async (req, res) => {
    const { pname, ptitle, pdescription, pprice, pcategory, quantity } =
      req.body;
    const updateData = {
      pname,
      ptitle,
      pdescription,
      pprice,
      quantity,
      pcategory,
    };

    if (req.file) {
      updateData.pimage = req.file.filename;
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.productId,
        updateData,
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete("/deleteProduct/:productId", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/checkAvailability", async (req, res) => {
  try {
    const items = req.body.items;

    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product || product.quantity < item.quantity) {
        return res.status(200).json({
          success: false,
          message: `Item ${item.pname} is not available in the required quantity.`,
        });
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/updateQuantities", async (req, res) => {
  try {
    const cartItems = req.body.items;
    console.log("ddddd", cartItems);
    for (const item of cartItems) {
      const product = await Product.findById(item._id);
      console.log("pppp", product);
      if (product) {
        product.quantity -= item.quantity;
        await product.save();
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

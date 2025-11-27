import products from "../Models/productSchema.js";

// Creating a product

export const createProduct = async (req, res) => {
  try {
    const newProduct = new products(req.body); //req.body and assign in a single line.
    await newProduct.save();
    res
      .status(200)
      .json({ message: "Products Added Successfully", data: newProduct });
  } catch (error) {
    res
      .status(503)
      .json({ message: "Cannot Add the product, Error in create product" });
  }
};

//Get products

export const getAllProducts = async (req, res) => {
  try {
    const getProducts = await products.find();
    res
      .status(200)
      .json({ message: "Products Retrieved Successfully", data: getProducts });
  } catch (error) {
    res.status(503).json({
      message: "Cannot Retrieve the product, Error in get all products",
    });
  }
};

// get product by id

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const productDetail = await products.findById(productId);
    if (!productDetail) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res
      .status(200)
      .json({ message: "Product Retrieved Successfully", data: productDetail });
  } catch (error) {
    res.status(503).json({
      message: "Cannot Retrieve the product, Error in get product by id",
    });
  }
};

//Update Product

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price } = req.body;
    const result = await products.findByIdAndUpdate(
      { _id: productId },
      { name, price },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res
      .status(200)
      .json({ message: "Product Updated Successfully", data: result });
  } catch (error) {
    res.status(503).json({
      message: "Cannot Update the product, Error in Update product",
    });
  }
};

// Delete Product

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const result = await products.findByIdAndDelete({ _id: productId });
    if (!result) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const prod = await products.find();
    res
      .status(200)
      .json({ message: "Products Deleted Successfully", data: result });
  } catch (error) {
    res.status(503).json({
      message: "Cannot delete the product, Error in delete product",
    });
  }
};

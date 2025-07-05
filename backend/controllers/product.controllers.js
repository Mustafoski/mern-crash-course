import Product from '../models/product.model.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error fetching products' });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'Please provide all the fields' });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      message: 'Product created successfully',
      data: newProduct,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error saving product' });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error deleting product' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, updatedProduct, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error updating product' });
  }
};
export const getSingleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error fetching product' });
  }
};

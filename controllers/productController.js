import Product from '../models/Product.js';

/* ===============================
   GET ALL PRODUCTS (NO CHANGE)
================================ */
export const getProducts = async (req, res) => {
  try {
    const pageSize = 8;
    const page = Number(req.query.page) || 1;

    const keyword = req.query.keyword ? { $text: { $search: req.query.keyword } } : {};

    const category = req.query.category ? { category: req.query.category } : {};

    const filter = { ...keyword, ...category };

    const count = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET PRODUCT BY ID
================================ */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Invalid product ID' });
  }
};

/* ===============================
   CREATE PRODUCT (UPDATED)
================================ */

export const createProduct = async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);
    console.log('REQ FILE:', req.file); // 👈 MOST IMPORTANT

    if (!req.file) {
      return res.status(400).json({
        message: 'Image file not received (req.file is undefined)',
      });
    }

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      image: req.file.path,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('CREATE PRODUCT ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   UPDATE PRODUCT (UPDATED)
================================ */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    // 👇 Update image only if new image uploaded
    if (req.file) {
      product.image = req.file.path;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE PRODUCT
================================ */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all products (ADMIN with pagination)
// @route GET /api/products/admin
// @access Admin
// import Product from '../models/Product.js'; // 🔴 REQUIRED

export const getAdminProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.page) || 1;

    const count = await Product.countDocuments();

    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.error('ADMIN PRODUCTS ERROR:', error); // 🔥 ADD THIS
    res.status(500).json({ message: error.message });
  }
};

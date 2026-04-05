import Product from '../models/product.js';
import Category from '../models/category.js';
import Review from '../models/review.js';
import sequelize from '../db/config.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

export const createProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'seller') {
      return res.status(403).json({ message: "Only sellers can add products" });
    }

    const { title, price, categoryId, product_desc, stock } = req.body;
    
    let img_link = null;
    if (req.file) {
      img_link = `uploads/${req.file.filename}`;
    } else {
      img_link = `https://picsum.photos/seed/${encodeURIComponent(title)}/300/200.jpg`;
    }

    if (!title || !price || !categoryId) {
      return res.status(400).json({ message: "Title, price, and categoryId are required" });
    }

    const product = await Product.create({
      title,
      price,
      categoryId,
      img_link,
      product_desc,
      stock: stock || 0,
      sellerId: req.user.id,
      sellerName: req.user.name,
      unit: 'kg'
    });

    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category'   
        }
      ]
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: 'category'   
        },
        {
          model: Review     
        }
      ]
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'seller') {
      return res.status(403).json({ message: "Only sellers can update products" });
    }

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own products" });
    }

    await product.update(req.body);
    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'seller') {
      return res.status(403).json({ message: "Only sellers can delete products" });
    }

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own products" });
    }

    await product.destroy();
    res.json({ message: "Product deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const bulkInsert = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const productsData = req.body;

    for (let item of productsData) {
      const product = await Product.create(
        {
          title: item.title,
          price: item.price,
          categoryId: item.categoryId,
          img_link: item.img_link,
          product_desc: item.product_desc,
          stock: item.stock || 0,
          sellerId: item.sellerId,
          sellerName: item.sellerName,
          unit: 'kg'
        },
        { transaction: t }
      );

      if (item.reviews && item.reviews.length > 0) {
        for (let rev of item.reviews) {
          await Review.create(
            {
              rating: rev.rating,
              comment: rev.comment,
              reviewerName: rev.reviewerName,
              reviewerEmail: rev.reviewerEmail,
              productId: product.id
            },
            { transaction: t }
          );
        }
      }
    }

    await t.commit();
    res.json({ message: "Bulk insert success" });

  } catch (err) {
    await t.rollback();
    res.status(500).json({ error: err.message });
  }
};

export { upload };
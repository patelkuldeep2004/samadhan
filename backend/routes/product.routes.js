import express from 'express';
import { validationResult, body } from 'express-validator';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, bulkInsert, upload } from '../controller/product.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

router.post('/bulk', bulkInsert);

router.post('/', 
  authMiddleware,
  upload.single('image'),
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
  body('categoryId').isInt().withMessage('CategoryId must be an integer'),
  handleValidationErrors,
  createProduct
);

router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', 
  authMiddleware,
  upload.single('image'),
  updateProduct
);

router.delete('/:id', 
  authMiddleware,
  deleteProduct
);

export default router;
import express from 'express';
import { body, validationResult } from 'express-validator';
import { signup, login, forgotPassword } from '../controller/user.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
};

router.post('/signup',
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ characters'),
  body('role').isIn(['buyer', 'seller']).withMessage('Role must be buyer or seller'),
  handleValidationErrors,
  signup
);

router.post('/login',
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors,
  login
);

router.post('/forgot-password',
  body('email').isEmail().withMessage('Valid email is required'),
  handleValidationErrors,
  forgotPassword
);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: "Profile access",
    user: req.user   
  });
});

export default router;
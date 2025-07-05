import express from 'express';

import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../controllers/product.controllers.js';

const router = express.Router();

// Define routes with proper paths
router.post('/', createProduct);           // POST /api/products
router.get('/', getProducts);              // GET /api/products
router.get('/:id', getSingleProduct);      // GET /api/products/:id
router.put('/:id', updateProduct);         // PUT /api/products/:id
router.delete('/:id', deleteProduct);      // DELETE /api/products/:id

export default router;

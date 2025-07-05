import express from 'express';

import {
  createProduct,
  deleteProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
} from '../controllers/product.controllers.js';
const router = express.Router();

router.post('', createProduct);
router.delete('/:id', deleteProduct);
router.get('', getProducts);
router.get('/:id', getSingleProduct);
router.put('/:id', updateProduct);

export default router;

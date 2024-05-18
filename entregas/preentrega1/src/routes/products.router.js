import express from "express";

const router = express.Router();

import ProductsController from "../controllers/products.controller";
const pc = new ProductsController;

// Define rutas y asigna controladores para manejar solicitudes

router.get('/', pc.getAllProducts);
router.get('/:pid', pc.getProductById);
router.post('/', pc.createProduct);
router.put('/:pid', pc.updateProduct);
router.delete('/:pid', pc.deleteProduct);

export default router
import express from "express";

const router = express.Router();

import ProductsController from "../controllers/products.controller.js";
const pc = new ProductsController;

// Define rutas y asigna controladores para manejar solicitudes

router.get('/', (req, res) => pc.getAllProducts);
router.get('/:pid', (req, res) => pc.getProductById);
router.post('/', (req, res) => pc.createProduct);
router.put('/:pid', (req, res) => pc.updateProduct);
router.delete('/:pid', (req, res) => pc.deleteProduct);

export default router
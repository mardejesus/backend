import express from "express";
const router = express.Router();

import CartsController from "../controllers/carts.controller.js";
const cc = new CartsController;

// Define rutas y asigna controladores para manejar solicitudes
router.post('/', (req, res) => cc.createEmptyCart)
router.post('/:cid/product/:pid', (req, res) => cc.addProductToCart)
router.get('/:cid', (req, res) => cc.getProductsById)

export default router
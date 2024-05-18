import express from "express";
const router = express.Router();

import CartsController from "../controllers/carts.controller";
const cc = new CartsController;

// Define rutas y asigna controladores para manejar solicitudes
router.post('/', cc.createEmptyCart)
router.post('/:cid/product/:pid', cc.addProductToCart)
router.get('/:cid', cc.getProductsById)

export default router
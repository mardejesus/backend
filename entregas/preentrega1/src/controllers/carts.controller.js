import CartManager from '../services/cartManager.js';
export default class CartsController{
    #cm = new CartManager('carritos.json');

    async createEmptyCart(req, res){
        try{
            const cartId = await this.#cm.createEmptyCart();
            res.status(201).json({id: cartId});
        } catch (e) {
            console.log(e)
        }
    }

    async getCartById(req, res){
        try{
            const id = parseInt(req.params.cid);
            const cart = await this.#cm.getCartById(id);
            res.status(200).json(cart);
        } catch (e) {
            console.log(e)
        }
    }

    async addProductToCart(req, res){
        try{
            const cid = parseInt(req.params.cid);
            const pid = parseInt(req.body.pid);
            await this.#cm.addProductToCart(cid, pid);
            res.status(201).json({message: 'Producto agregado al carrito'});
        } catch (e) {
            console.log(e)
        }
    }

}
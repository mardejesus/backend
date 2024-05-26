import FileManager from "./FileManager.js";
export default class CartManager {
    constructor(){
        this.fm = new FileManager('carritos.json', {nextId: 0, carts: []});
    }

    async createEmptyCart(){
        const data = await this.fm.jsonToObj(); // data es un objeto con la estructura {nextId: n, carts: [{id: n, products: []}]}
        data.nextId += 1;
        data.carts.push({id: data.nextId, products: []});
        await this.fm.rewriteJsonWithObj(data)
        return data.nextId;
    }

    async getCartById(id){
        const data = await this.fm.jsonToObj();
        const cart = data.carts.find(c => c.id === id);
        if (!cart){
            throw new Error(`No existe ningún carrito con id ${id}`)
        }
        return cart;
    }

    async addProductToCart(cid, pid){
        const data = await this.fm.jsonToObj();
        const cart = data.carts.find(c => c.id === cid);
        if (!cart){
            throw new Error(`No existe ningún carrito con id ${cid}`)
        }
        if (cart.products.some(p => p.product === pid)){
            cart.products.find(p => p.product === pid).quantity += 1; // Si ya existe el producto, incremento la cantidad
        } else {
            cart.products.push({product: pid, quantity: 1}); // Si no existe, lo agrego con cantidad 1
        }
        await this.fm.rewriteJsonWithObj(data);
    }

    async getProductsById(id){
        const cart = await this.getCartById(id);
        return cart.products;
    }

}
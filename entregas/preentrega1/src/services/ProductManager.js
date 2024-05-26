// Funciones específicas para manejar la lógica de los productos
import FileManager from './FileManager.js';

export default class ProductService{
    constructor(){
        this.fm = new FileManager('productos.json', {nextid: 0, products: []});
    }

    async addProduct(product){
        let data = await this.fm.jsonToObj();
        let products = data.products;

        // Verifico que el código no esté repetido
        if (products.some(p => p.code === product.code)){
            throw new Error(`El producto con código ${product.code} ya se encuentra en la lista.`)
        }

        product.id = data.nextid++;
        products.push(product);

        await this.fm.rewriteJsonWithObj(data);
    }

    async getProducts(){
        let data = await this.fm.jsonToObj();
        return data.products;
    }

    async getProductById(id){
        this.#checkId(id);
        let data = await this.fm.jsonToObj();
        let product = data.products.find(p => p.id === id);

        if (!product){
            throw new Error(`No existe ningún producto con id ${id}`)
        }

        return product;
    }

    async updateProduct(id, product){
        this.#checkId(id);
        let data = await this.fm.jsonToObj();
        let products = data.products;

        let index = products.findIndex(p => p.code === product.code);
        if (index < 0){
            throw new Error(`No existe ningún producto con id ${id}`)
        }

        data.products[index] = {...products[index], ...product}; // Actualizo el producto
        await this.fm.rewriteJsonWithObj(data);
    }

    async deleteProduct(id){
        this.#checkId(id)
        let data = await this.fm.jsonToObj()
        let newProducts = data.products.filter(p => p.id !== id);

        if (newProducts.length === data.products.length){
            throw new Error(`No existe ningún producto con id ${id}`)
        }

        data.products = newProducts;
        await this.fm.rewriteJsonWithObj(data)
    }

    #checkId(id){
        if (typeof id !== 'number' || id<0) {
            throw Error("El id debe ser un numero entero mayor o igual a 0")
        }
    }
}
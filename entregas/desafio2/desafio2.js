import {promises as fs} from 'fs'

export class ProductManager{
    #fs;
    #path;

    constructor(path) {
        this.#path = path;
        this.#fs = fs
    }

    async #jsonAObjeto(){
        try {
            let jsonString = await this.#fs.readFile(this.#path, 'utf-8');
            return JSON.parse(jsonString);
        } catch (error) {
            throw new Error(`Error al leer el archivo JSON: ${error.message}`);
        }
    }

    async #reescribirJsonConObjeto(objeto){
        try {
            let jsonString = JSON.stringify(objeto, null, 2);
            await this.#fs.writeFile(this.#path, jsonString);
        } catch (error) {
            throw new Error(`Error al escribir en el archivo JSON: ${error.message}`);
        }
    }

    async addProduct(producto){
        // !var evalua si var es falsy: cadena vacia, undefined o null.
        // compuebo validez de argumento, que el objeto tenga las propiedades requeridas.
        if (!producto || typeof producto !== 'object' || !producto.hasOwnProperty('title') || !producto.hasOwnProperty('description') || !producto.hasOwnProperty('price') || !producto.hasOwnProperty('thumbnail') || !producto.hasOwnProperty('code') || !producto.hasOwnProperty('stock')){
            throw Error("Se esperaba un objeto con las siguientes propiedades: title, description, price, thumbnail, code, stock.")
        }

        try { // intenta acceder al archivo, lo crea si no existe y agrega un objeto {products: []} en formato JSON.
            await this.#fs.access(this.#path)
        }catch (error){
            await this.#fs.writeFile(this.#path, JSON.stringify({nextid:0, products:[]}, null, 2))
        }

        // lee y guarda archivo JSON como string y lo pasa a objeto
        let jsonObjeto = await this.#jsonAObjeto()

        if (jsonObjeto.products.some(p => p.code === producto.code)){ // verifica que el código no esté repetido
            throw new Error(`El producto con codigo ${producto.code} ya se encuentra en la lista.`)
        }

        producto.id = jsonObjeto.nextid++
        jsonObjeto.products.push(producto) // agrega el objeto producto al array de productos

        // vuelve a convertir el objeto a JSON y sobreescribe el archivo
        await this.#reescribirJsonConObjeto(jsonObjeto)
    }

    async getProducts(){
        try {
            let obj = await this.#jsonAObjeto();
            if (!obj || !obj.products){throw new Error('El JSON no tiene a estructura esperada')}
            return [...obj.products]; // devuelve copia para garantizar privacidad
        }
        catch (e){
            console.log(`Error en el método getProducts: ${e}`)
        }
    }

    #checkId(id){
        if (typeof id !== 'number' || id<0) {
            throw Error("El id debe ser un numero entero mayor o igual a 0")
        }
    }
    async getProductById(id){
        this.#checkId(id)
        let jsonObjeto = await this.#jsonAObjeto()
        let result = jsonObjeto.products.find((p)=>p.id===id)
        if (!result) { throw Error(`No existe ningun producto con id ${id}`)}
        return result
    }

    async updateProduct(id, productoActualizado){
        if (!productoActualizado || typeof productoActualizado !== 'object'){
            throw Error("Se espera un objeto con las propiedades del producto a actualizar")
        }
        this.#checkId(id)
        let jsonObjeto = await this.#jsonAObjeto()
        let indexProducto = jsonObjeto.products.findIndex((p)=>p.id===id)
        if (indexProducto<0) { throw Error(`No existe ningun producto con id ${id}`)}

        jsonObjeto.products[indexProducto] = {...jsonObjeto.products[indexProducto], ...productoActualizado}

        await this.#reescribirJsonConObjeto(jsonObjeto)
    }

    async deleteProduct(id){
        this.#checkId(id)
        let jsonObjeto = await this.#jsonAObjeto()
        jsonObjeto.products = jsonObjeto.products.filter((p) => p.id !== id);
        await this.#reescribirJsonConObjeto(jsonObjeto)
    }
}




export async function operaciones(){
    try {
        const productos = new ProductManager("./prueba.json")
        //await productos.addProduct({title:"titulo2", description: "producto2", price: 1, thumbnail: null, code: 2, stock: 1})
        console.log(await productos.getProductById(1))
        //await productos.updateProduct(1, {price:1000})
        //console.log(await productos.getProductById(1))
        await productos.deleteProduct(0)
    }catch (error){
        console.log(error)
    }
}

await operaciones()


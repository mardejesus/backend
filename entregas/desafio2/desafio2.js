class ProductManager{
    #fs;
    #path;

    constructor(path) {
        this.#path = path;
        this.#fs = require('fs')
    }

    async addProduct(producto){
        // !var evalua si var es falsy: cadena vacia, undefined o null.
        // compuebo validez de argumento, que el objeto tenga las propiedades requeridas.
        if (!producto || typeof producto !== 'object' || !producto.hasOwnProperty('title') || !producto.hasOwnProperty('description') || !producto.hasOwnProperty('price') || !producto.hasOwnProperty('thumbnail') || !producto.hasOwnProperty('code') || !producto.hasOwnProperty('stock')){
            throw Error("Se esperaba un objeto con las siguientes propiedades: title, description, price, thumbnail, code, stock.")
        }

        try { // intenta acceder al archivo, lo crea si no existe y agrega un objeto {products: []} en formato JSON.
            await this.#fs.promises.access(this.#path)
        }catch (error){
            await this.#fs.promises.writeFile(this.#path, JSON.stringify({nextid:0, products:[]}, null, 2))
        }

        // lee y guarda archivo JSON como string y lo pasa a objeto
        let jsonString = await this.#fs.promises.readFile(this.#path, "utf-8")
        let jsonObjeto = JSON.parse(jsonString)

        if (jsonObjeto.products.some(p => p.code === producto.code)){ // verifica que el código no esté repetido
            throw new Error(`El producto con codigo ${producto.code} ya se encuentra en la lista.`)
        }

        producto.id = jsonObjeto.nextid++
        jsonObjeto.products.push(producto) // agrega el objeto producto al array de productos

        // vuelve a convertir el objeto a JSON y sobreescribe el archivo
        jsonString = JSON.stringify(jsonObjeto, null, 2)
        await this.#fs.promises.writeFile(this.#path, jsonString)
    }

    async getProducts(){
        let jsonObjet= JSON.parse(await this.#fs.promises.readFile(this.#path, "utf-8"))
        return [...jsonObjet.products]; // devuelve copia para garantizar privacidad
    }
}


const productos = new ProductManager("./prueba.json")
productos.addProduct({title:"titulo", description: "producto", price: 1, thumbnail: null, code: 1, stock: 1})

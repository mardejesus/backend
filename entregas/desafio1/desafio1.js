// realizar clase "ProductManager" que gestione un conjunto de productos

class ProductManager{
    constructor(){
        this.products = [];
        this.id = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Todos los campos son obligatorios.");
        }
        if(this.verifyCode(code)===true){
            throw new Error(`El producto con codigo ${code} ya se encuentra en la lista.`)
        }
        else{
            this.products.push({
                id: this.id,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            })
            id++;
        }
    }

    getProducts(){
        return [...this.products]; // devuelve copia para garantizar privacidad
    }

    getProductById(id){
        const result = this.products.find((p)=> p.id === id)
        return result !== undefined ? result : throw new Error("Not Found")
    }

    verifyCode(code){ // true si algun producto tiene ese código, false si ninguno lo tiene.
        return this.productos.some(product => product.code === code)
    }

}

let productmanager = new ProductManager();
console.log(productmanager.getProducts());
console.log(productmanager.getProductById(0));
console.log(productmanager.verifyCode(0));

productmanager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
console.log(productmanager.getProducts());
console.log(productmanager.getProductById(0));
console.log(productmanager.verifyCode("abc123"));

productmanager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);



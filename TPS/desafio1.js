// realizar clase "ProductManager" que gestione un conjunto de productos

class ProductManager{
    constructor(){
        this.products = [];
        this.id = 0;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(this.verifyByCode(code)==true){
            console.log(`El producto con codigo ${code} ya se encuentra en la lista.`)
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
        this.products.forEach(element => {
            if(element.id === id){
                return element;
            }
        })
        return "Not found"
    }

    verifyByCode(code){
        this.products.forEach(element => {
            if(element.code===code){
                return true;
            }
        });
        return false;
    }

}

let productmanager = new ProductManager();
console.log(productmanager.getProducts());
console.log(productmanager.getProductById(0));
console.log(productmanager.verifyByCode(0));

productmanager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);
console.log(productmanager.getProducts());
console.log(productmanager.getProductById(0));
console.log(productmanager.verifyByCode("abc123"));

productmanager.addProduct("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25);



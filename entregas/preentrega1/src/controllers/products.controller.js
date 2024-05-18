// Lógica para manejar las peticiones de productos
// Usa funciones específicas de ProductManager.js para manejar la lógica de los productos

export default class ProductsController {
  pm = new ProductManager('productos.json');

  async createProduct(req, res) {
    try{
        const {title, description, code, price, status, stock, category, thumbnails} = req.body;
        if (!title || !description || !code || !price || !status || !stock || !category){
            return res.status(400).json({error: 'El producto debe contener: title, description, code, price, status, stock y category.'});
        }
        const newProduct = {
            title: title,
            description: description,
            code: code,
            price: price,
            status: status,
            stock: stock,
            category: category,
            thumbnails: thumbnails
        }
        await this.pm.addProduct(newProduct);
        res.status(201).json(newProduct);
    } catch (e) {
        console.log(e)
    }
  }

  async getAllProducts(req, res) {
    try{
        const products = await this.pm.getProducts();
        res.status(200).json(products);
    } catch (e) {
        console.log(e)
    }
  }

  async getProductById(req, res) {
    try{
        const id = parseInt(req.params.pid);
        const product = await this.pm.getProductById(id);
        res.status(200).json(product);
    } catch (e) {
        console.log(e)
    }
  }

  async updateProduct(req, res) {
    try{
        const id = parseInt(req.params.pid);
        const newProduct = req.body.product;
        await this.pm.updateProduct(id, newProduct);
        res.status(200).json(newProduct);
    } catch (e) {
        console.log(e)
    }
  }

  async deleteProduct(req, res) {
    try{
        const id = parseInt(req.params.pid);
        await this.pm.deleteProduct(id);
        res.status(200).json({message: 'Producto eliminado'});
    } catch (e) {
        console.log(e)
    }
  }

}


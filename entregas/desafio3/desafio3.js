import express from 'express';
import {ProductManager} from '../desafio2/desafio2.js';

const app = express();
const port = 8080;

// Creo Product Manager y lleno el archivo

const pm = new ProductManager('./desafio3.json')
/*let llenarArchivo = async ()=> {
    for (let i = 0; i < 20; i++) {
        await pm.addProduct({
            title: `producto${i}`,
            description: `este es el producto${i}`,
            price: 1000,
            thumbnail: '',
            code: i,
            stock: 5
        })
    }
}*/

let obtenerProductos = async (max)=>{
    let resultado = await pm.getProducts();
    return !max ? resultado : resultado.slice(0, max);
}

//await llenarArchivo();

// Creo y levanto el servidor
app.get('/products', async (req, res) => {
    const max = parseInt(req.query.limit);
    try {
        res.send(await obtenerProductos(max));
    }
    catch (error){
        console.error(`Error al buscar productos en archivo: ${error}`)
    }
})

app.listen(port, ()=>{console.log(`Servidor arriba en puerto ${port}`)})




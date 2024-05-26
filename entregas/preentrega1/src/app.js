import express from 'express'; // importar
const app = express(); // instanciar express
const PORT = 8080; // declarar puerto

// configuro servidor para recibir archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// configuro archivos para cada ruta
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// configuro directorio para archivos estáticos
import __dirname from "./util.js";
app.use(express.static(__dirname + '/public'));

// inicio servidor para escuchar solicitudes en el puerto dado
app.listen(PORT, () => {
  console.log(`Servidor express corriendo en http://localhost:${PORT}`);
});


// Ejemplo en vivo
// crear servidor con módulo nativo de nodejs "http", setear una rta que contenga el mensaje "mi primer hola mundo desde backend"
// el servidor debe escuchar en el puerto 8080 (correr con nodemon)
// probar el servidor desde el navegador
// hacer algún cambio en código y corroborar que se reinicie automáticamente
// -----------------------------------------------------------------------------------------------------------------------------

const http = require('http');
const port = 8080

// creamos el server, recibe función callback
const server = http.createServer((request, response)=> {response.end("Mi primer hola mundo desde backend!")})

// levanto se server en el puerto 8080 para que cuando haga la request se ejecute la respuesta
server.listen(port, ()=>{console.log(`Server run on ${port}`)})
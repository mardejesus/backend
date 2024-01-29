// archivos

const fs = require('fs')

const dirname = './files'
const filename = dirname + '/ejemplo.txt'

if(!fs.existsSync(dirname)){
    fs.mkdirSync(dirname);
}

fs.writeFileSync(filename, "Hola, estoy en un archivo")

// Lectura

if(fs.existsSync(filename)){
    console.log(fs.realpathSync(filename)) // muestra ruta absoluta

    // LEER 

    let contenido = fs.readFileSync(filename, 'utf-8')
    console.log(contenido)

    // AGREGAR MAS CONTENIDO si existe

    fs.appendFileSync(filename, "Esta es la segunda línea")

    // LEER 
    
    contenido = fs.readFileSync(filename, 'utf-8')
    console.log(contenido)
}
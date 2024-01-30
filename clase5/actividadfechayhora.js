// realizar programa que cree un archivo en el cual escriba la fecha y hora actual
// leer el archivo y mostrar el contenido por consola
// usar modulo fs y sus operaciones callback

const fs = require('fs');
const dirname = "./fechas";
const filename = dirname + "/fechaHora.txt";

let FyH = new Date().toString()

fs.mkdir(dirname, {recursive: true}, (error)=>{
    if (error) throw Error("no se pudo crear el directorio")

    fs.writeFile(filename, FyH, (error)=>{
        if (error) throw Error("no se pudo escribir en archivo")

        fs.readFile(filename, 'utf-8', (error, contenido)=>{
            if(error) throw Error("no se pudo leer el archivo")

            console.log("Contenido:")
            console.log(contenido)
        })
    })
})
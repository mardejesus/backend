// genero objeto info para guardar info
const info = {
    contenidoStr:"",
    contenidoObj:"",
    size:0
}

const fs = require('fs')
const filenameJSON = "./package.json"
const fileinfoJSON = "./info.json"

const fsConPromesasJSON = async () =>{ //creo ambiente asincronico
    // lectura
    if (!fs.existsSync(filenameJSON)){
        console.error("Archivo no existe, ejecutar comando npm init -y")
        throw Error("No se puede leer archivo porque no existe: " + filenameJSON)
    }

    // obtenemos JSON String
    let jsonString = await fs.promises.readFile(filenameJSON, "utf-8")
    console.info("Archivo JSON obtenido desde archivo: ")
    console.log(jsonString)

    info.contenidoStr = jsonString
    info.contenidoObj = JSON.parse(jsonString) // convertimos esa cadena JSON a objeto JS


    // guardamos en formato JSON
    await fs.promises.writeFile(fileinfoJSON, JSON.stringify(info, null, 2))
}
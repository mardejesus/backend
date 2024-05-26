import {promises as fs} from 'fs'

export default class FileManager{
    #fs;
    #path;
    #initialObject;

    constructor(path, initialObject){
        this.#fs = fs; // modulo de node para manejo de archivos
        this.#path = path; // ruta de archivo que persiste datos
        this.#initialObject = initialObject; // objeto inicial que se guarda en el archivo
        this.rewriteJsonWithObj(initialObject); // escribe el objeto inicial en el archivo (si no existe
    }

    async jsonToObj(){
        try {
            let jsonString = await this.#fs.readFile(this.#path, 'utf-8'); // lee el archivo y lo guarda como string
            return JSON.parse(jsonString); // convierte el string a objeto
        } catch (error) {
            throw new Error(`Error al leer el archivo JSON: ${error.message}`);
        }
    }

    async rewriteJsonWithObj(objeto) {
        try {
            let jsonString = JSON.stringify(objeto, null, 2); // convierte el objeto a string
            await this.#fs.writeFile(this.#path, jsonString); // escribe el string en el archivo
        } catch (error) {
            throw new Error(`Error al escribir en el archivo JSON: ${error.message}`);
        }
    }

}
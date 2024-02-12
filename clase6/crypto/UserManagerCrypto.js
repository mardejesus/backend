class UserManagerCrypto{

    #users;
    #userDirPath;
    #userFilePath;
    #fileSystem; // var privadas con #

    #crypto = require('crypto');
    #algorithm = 'aes-256-cbc';

    // datos para validar usuarios:
    #key = this.#crypto.randomBytes(32);
    #iv = this.#crypto.randomBytes(16);

    constructor() {
        this.#users = []; // es lo mis mismo que crear el array haciendo [], pero asi le doy memoria
        this.#userDirPath = './files'
        this.#userFilePath = this.#userDirPath + '/UsuarioHash.json'
        this.#fileSystem = require('fs')
    }

    crearUsuario = async (nombre, apellido, username, password) =>{ // async porque trabaja con archivos
        let usuarioNuevo = new User(nombre, apellido, username, this.#encrypt(password))
        usuarioNuevo.key = this.#key.toString('hex')
        usuarioNuevo.iv = this.#iv.toString('hex')

        try {
            await this.#prepararDirectorioBase();
            await this.consultarUsuarios()
            if (this.#users.find(u => u.username === username)){
                console.warn("usuario ya existe");
            }else{
                this.#users.push(usuarioNuevo);
                console.log(`lista de usuarios actualizada: \n${this.#users}`)
                // se sobreescribe el archivo de usuarios para persistencia
                await this.#fileSystem.promises.writeFile(this.#userFilePath, JSON.stringify(this.#users))
            }
        }
        catch (error){
            console.log("Error al crear usuario")
        }
    }

    #prepararDirectorioBase = async () => {
        await this.#fileSystem.promises.mkdir(this.#userDirPath, {recursive: true})
        if (!this.#fileSystem.existsSync(this.#userFilePath)){
            await this.#fileSystem.promises.writeFile(this.#userFilePath, "[]");
        }
    }

    consultarUsuarios = async () => {
        try {
            await this.#prepararDirectorioBase()
            let usuariosFile = await this.#fileSystem.promises.readFile(this.#userFilePath, "utf-8"); // leemos el archivo obteniendo el JSON String
            this.#users = await JSON.parse(usuariosFile); // pasamos JSON a OBJETO y actualizamos usuarios
            return this.#users; // DEVUELVE ARREGLO DE USUARIOS
        }
        catch (error){
            console.log("error al consultar usuarios " + error)
        }
    }

    validarUsuarios = async (username, password) => {
        // usa metodo desencriptar contra
        try{
            await this.consultarUsuarios();
            const user = this.#users.find(u => u.username === username);
            if (user){
                console.log(`usuario ${user.username} encontrado`);
                let newHashPassword = this.#decrypt(password, user.key, user.iv);
                console.log(`credenciales a evaluar:\npassword ingresado: ${newHashPassword}, password obtenido del usuario: ${user.password}`);
                newHashPassword === user.password ? console.log("login exitoso") : console.log("login no exitoso")
            }
            else {
                console.warn(`usuario ${username} no encontrado`)
            }
        }
        catch (error){
            console.log(`error validando credenciales del usuario: ${username}\ndetalle del error ${error}`)
        }
    }

    // Métodos de encriptación

    #encrypt = (text) => { // en la libería está como encriptar, no importa lo que hace cada línea
        let cipher = this.#crypto.createCipheriv(this.#algorithm, Buffer.from(this.#key), this.#iv)
        let encrypted = cipher.update(text) // cadena de bytes
        encrypted = Buffer.concat([encrypted, cipher.final()])
        return encrypted.toString('hex') // lo pasamos a hexadecimal para leer mejor
    }

    #decrypt = (text) => {
        let iv = Buffer.from(this.#iv, 'hex')
        let encryptedText = Buffer.from(text, 'hex')
        let decipher = this.#crypto.createDecipheriv(this.#algorithm, Buffer.from(this.#key), iv)
        let decrypted = decipher.update(encryptedText)
        decrypted = Buffer.concat([decrypted, decipher.final()])
        return decrypted.toString();
    }

}

class User{
    constructor(nombre, apellido, username, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.username = username;
        this.password = password;
    }
}

module.exports = UserManagerCrypto; // exportamos para importar en index
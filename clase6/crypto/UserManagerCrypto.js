class UserManagerCrypto{

    users;
    #userDirPath;
    #userFilePath;
    #fileSystem; // var privadas con #

    #crypto = require('crypto');
    #algorithm = 'aes-258-cbc';
    // key y iv son para validar
    #key = this.#crypto.randomBytes(32);
    #iv = this.#crypto.randomBytes(16);

    constructor() {
        this.#users = new Array();
        this.#userDirPath = './files'
        this.#userFilePath = this.#userDirPath + '/UsuarioHash.json'
        this.#fileSystem = require('fs')
    }

    crearUsuario = async (nombre, apellido, username, password) =>{

    }

    consultarUsuarios = async () => {

    }

    validarUsuarios = async (username, password) => {
        // usa metodo desencriptar contra
    }

    // Métodos de encriptación

    #dencrypt = (text, key, iv) => {

    }

    #encrypt = (text, key, iv) => {

    }

}

module.exports = UserManagerCrypto;
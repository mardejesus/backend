const UM = require('./UserManagerCrypto.js');  // importo clase

let userManager = new UM();

let persistirUsuario = async () => { // necesito generar ambiente asincronico que recibe crea y usa metodos de usuario

    try {
        await userManager.crearUsuario("Mar", "De Jesus", "mardejesus", "passwordPlano");

        let usuarios = await userManager.consultarUsuarios();
        console.log(`Usuarios encontrados en User Manager: ${usuarios.length}\n\n${usuarios}`)

        await userManager.validarUsuarios("mardejesus", "passwordPlano")

    }

    catch (error){
        console.log(`error en persistir usuario: ${error}`)
    }

}

persistirUsuario();
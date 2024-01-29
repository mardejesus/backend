// PROMESAS

const { randomInt } = require("crypto")

/*  
Hacer una promesa es asegurar que va a pasar algo a futuro
Llegado el momento, se cumple o no se cumple

Una promesa es un OBJETO, que tiene 3 estados:
    - pendiente: estado inicial antes de tener exito o fallar
    - resuelto: promesa completa
    - rechazado: promesa fallida
*/


// setTimeout(()=>{console.log("hola")}, 5000) --- ejecuta funcion despues de 5 seg

// si se llama a resolve() dentro de la promesa, se ejecuta lo de .then(calalback)
// si se llama a reject() dentro de la promesa, se ejecuta lo de .catch(callback)


/*const MiPromesa = new Promise((resolve, reject)=>{
    setTimeout(
        ()=>{
            let num = randomInt(0, 2)
            if(num==0){resolve(num)}
            else{reject(num)}
        }, 5000
    )
})

MiPromesa
.then((numRecibido)=>{console.log(`resuelta con numero ${numRecibido}`)})
.catch((numRecibido)=>{console.log(`rechazada con numero ${numRecibido}`)})
*/


/*

// PROMESAS EN CLASE


const dividirConPromesa = (dividendo, divisor) => {

    // definimos la promesa
    return new Promise((resolve, reject) => {

        if(divisor===0){
            reject("no se puede dividir por 0"); // reject lanza error
        }
        else{
            resolve(dividendo/divisor);
        }

    })
}

// unsando catch capturo y manejo errores

dividirConPromesa(5,2)
    .then(resultado => console.log(resultado))
    .catch(error=>console.log(error))
*/


// ASYNC AWAIT

// una función async siempre devuelve una promesa
// dentro de async puede usarse await para esperar que una promesa se resuelva papra seguir
// async y await se usan cuando se trabaja con funciones que devuelven promesas


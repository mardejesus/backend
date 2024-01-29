// .................. EJ1 ..................
// CALLBACK
// Recrear un callback de función map

let arregloDePrueba = [1,2,3,4,5];

const miFuncionMap = (arreglo, callback)=>{
    let resultado = [];

    for(let i=0; i<arreglo.length; i++){
        resultado.push(callback(arreglo[i]));
    }

    return resultado;
}

let nuevoArregloConMap = arregloDePrueba.map(x => x*2);
let nuevoArregloPropio = miFuncionMap(arregloDePrueba, x => x*2);

console.log(nuevoArregloConMap);
console.log(nuevoArregloPropio);
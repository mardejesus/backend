// Array.map(): genera otro array a partir de uno
// map recibe una función con argumentos: (elemento, indice, array)

const array = [1,2,3,4]


const numeros = array.map((num)=>num*2)
console.log(numeros)


// exponencial **: a^b = a**b

console.log(2**2)

// array.includes(): corrobora si un elemento está en un array

console.log(array.includes(0))
console.log(array.includes(1))

// Objeto en JS es conjunto de pares key:value, por ejemplo, Persona={nombre:"juan", edad:20}
// Los objetos pueden tener propiedades y metodos

// Object.entries ---> transformo en array de arrays, obtengo en arreeglos individuales la propiedad con su valor ---> [[nombre, "Juan"], [edad, 22]]
// Objects.key ---> retorna array de claves
// Objects.value ---> retorna array de values
// Object.reduce ---> retorna la suma de todos los valores

const impuestos = {
    i1: 2000,
    i2: 3000,
    i3: 400,
    i4: 900,
    metodo:function(){}
}

let parLlaveValor = Object.entries(impuestos)
console.log(parLlaveValor)

// es como transformar un objeto en una "matriz", un array de arrays se puede ver asi.


// calcular el total de impuestos

let valores = Object.values(impuestos)

let impuestoTotal = valores.reduce((valorAcumulado, valorActual)=>{
    console.log(`valor actual ${valorActual}\nvalor acumulado ${valorAcumulado}`)
    return valorAcumulado+valorActual
})



// ---------------------------------------- ES9 ----------------------------------------

// array.slice(n, m) ---> devuelve copia de array con los elementos en indices [n, m) sin incluir m

// spread ---> "descomprime" un array, devuelve elementos sueltos, ejemplo: [1, 2, 3] con spread queda ...[1,2,3] = 1,2,3

// rest ---> depende como usemos el ... operador, se comporta como spread o rest.
// usando el operador como argumento de una funcion, dentro de la funcion funciona como array.
// (...args) => {retunr args} ---> devuelve un array de los argumentos pasados, es REST

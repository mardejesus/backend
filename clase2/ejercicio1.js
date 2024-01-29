function mostrarLista(array){

    for(const element of array){
        console.log(element);
    }

    if(array.length===0){
        console.log("Lista vacia")
    }

    return `Tamaño de la lista: ${array.length}`

}

let resultado1 = mostrarLista([])
let resultado2 = mostrarLista([1,2,3,4,5])

console.log(resultado1)
console.log(resultado2)
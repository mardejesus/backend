// Dado un arreglo de objetos de tipo usuario, realizar un servidor en express que permita obtener dichos usuarios
// La ruta raíz '/' debe devolver todos los usuarios
// La ruta /:userId debe devolver solo al usuario con dicho id

import express from 'express';
const app = express();

// Simulamos nuestra base de datos
const usuarios = [
    {id: 1, nombre:"Juan", apellido:"Torres", edad:"X", genero:"M"},
    {id: 2, nombre:"Carlos", apellido:"Garcia", edad:"20", genero:"M"},
    {id: 3, nombre:"Maria", apellido:"Torres", edad:"15", genero:"F"},
    {id: 4, nombre:"Patricia", apellido:"Ramirez", edad:"30", genero:"F"}
]

const puerto = 8080;

app.get('/', (req, res)=>{

});

const buscarPorId = (id) => {
    const user = usuarios.find(u=> u.id === parseInt(id))
    return user===undefined ? '<p style="color: red; font-size: 30px">Usuario no encontrado</p>' : `<p>Hola ${user.nombre} ${user.apellido}!</p><p>edad: ${user.edad}</p><p>id: ${user.id}</p>`
}

app.get('/:userId', (req, res)=>{
    res.send(buscarPorId(req.params.userId))
})

app.listen(puerto, ()=>{console.log(`Servidor arriba en puerto ${puerto}`)})

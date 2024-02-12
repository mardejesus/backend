// estructurar un servidor basado en express que escuche peticiones en el puerto 8080
// realizar una función para el método GET en la ruta '/saludo', el cual responderá con "Hola a todos desde express"
// ejecutar con nodemon y probar en el navegador el endpoint generado

import express from 'express' // o const express = require('express')
const app = express() // app va a contener cotas las funcionalidades de express

const ruta = '/saludo' // se le llama "endpoint" al path o ruta que pongo en la url, cada vez q entremos ahi da una rta (localhost:8080/saludo)
const port = 8080

// app.get indica al protocolo HTTP que en esa ruta se espera una petición de tipo GET
app.get(ruta, (req, res)=>{ // req = request (petición), res = response (respuesta)
    res.send("Hola a todos desde express!") // res.send sirve para responder a la petición
})

app.listen(port, ()=>{console.log(`Servidor arriba en puerto ${port}`)})

// app get configura el endpoint, pero no levanta al servidor para escuchar en algún puerto. Eso lo hace app.listen.
// nodemon archivo ---> en terminal


// USANDO REQ PARAMS
app.get(`/user/:nombre/:apellido`, (req, res)=>{
    console.log(req.params)
    res.send(`hola ${req.params.nombre} ${req.params.apellido}`)
})

app.get('/', (req, res)=> {
    res.send('<p style="color: pink; font-size: 30px;">HTML como respuesta</p>')
})

app.get('/usuario', (req, res)=>{
    res.send(
        {
            nombre: "juan",
            apellido: "torres"
        }
    )
})
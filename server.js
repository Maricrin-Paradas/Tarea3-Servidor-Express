const Contenedor = require('./Contenedor')
const express = require('express')

const app = express()

const productos = new Contenedor('productos.txt');

app.get('/productos', async (req, res) =>{
    const mostrarProductos = await productos.getAll();
	res.send(`Se muestra todos los productos: ${mostrarProductos}`);
})

app.get('/productosRandom', async (req, res) =>{
    const products = await productos.getAll();
	const numeroRandom = Math.floor(Math.random() * products.length);
	res.send(`Se muestran productos random: ${products[numeroRandom]}`);
})

const PORT = 3000;

const server = app.listen(PORT, ()=> {
    console.log(`Listening app port ${server.address().port}`);
})

server.on('error', (error)=>{
    console.log('error', error);
})
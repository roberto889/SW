/* 
  00_xpBase.js  - Implementar API usando un framework llamado EXPRESS

  Este archivo es la base y vamos a construir sobre el un API completo
  mediante sucesivas mejoras 

  Métodos: GET, POST, PUT, DELETE

  Glosario:
    API : Application Programming Interface
    JSON: Javascript Object Notation
    CRUD: Create, Read, Update and Delete
    NPM : Node.js package manager
*/

const express= require('express'); // Framework (instalado con npm)
const miAPI=express(); // Crear el servicio API es sencillo
const PUERTO = 3000; // Para mayor claridad, se define el puerto de escucha

///////////
// RUTAS //
///////////

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    console.log(req.baseUrl);
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1>');
});

// Metodo GET: para lectura de datos
miAPI.get('/datos', (req, res) => {
    res.send('Obteniendo datos');
});

// Metodo POST: para insertar datos
miAPI.post('/datos', (req, res) => {
    res.send('Insertando datos');
});

// Metodo PUT: para modificar datos
miAPI.put('/datos', (req, res) => {
    res.send('Actualizando datos');
});

// Metodo DELETE: para eliminar datos
miAPI.delete('/datos', (req, res) => {
    res.send('Borrando datos');
});

// Esta función genera respuesta si no existe la ruta que especifica el cliente 
miAPI.use( (req, res) => {    
    res.status(404).send('<h1 style="color:red">404: no encontrado</h1>');        
});

///////////////////////////////////////////
// Establece el puerto de escucha
miAPI.listen(PUERTO, 'localhost', () => {
    console.log(`Escuchando en localhost:${PUERTO}`);
});

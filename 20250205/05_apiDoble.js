/* 
  04_dobleAPI.js  - Implementar API usando un framework llamado EXPRESS
      * Información de ciudades y población, conectada a MySQL
      * Catálogo de animales y número de patas, basado en lista de objetos

  Cada API importa código de otro archivo  (ver evolución en Leeme.txt)

  Métodos: GET, POST, PUT, DELETE 

  Glosario:
    API : Application Programming Interface
    JSON: Javascript Object Notation
    CRUD: Create, Read, Update and Delete
    NPM : Node.js Package Manager
    REST: REpresentational State Transfer

Evolución de la API:
+----------------+-----------------------------------------+
| Fichero        | Descripción                             |
+----------------+-----------------------------------------+
| 00_xpBase.js   | Estructura básica de API usando express |
| 01_animales.js | Implementa parte del CRUD: GET y POST   |
| 02_animales.js | CRUD completo (incluye PUT y DELETE)    |
| 03_animales.js | Versión ligera (importa 03_animFunc.js) |
| 03_animFunc.js | Funciones que manejan animales          |
| Leeme.txt      | Archivo de texto con esta misma tabla   |
| ejemploMySQL.js| Conexión básica a la base de datos      |
+----------------+-----------------------------------------+
| 04_dobleAPI.js | Ampliación de la API, doble propósito   |
| 04_ciudadDB.js | Prototipo de ciudades (GET y database)  |
| 04_animFunc.js | Funciones que manejan animales          |
+----------------+-----------------------------------------+
| 05_dobleAPI.js | API doble propósito (urbano y fauna)    |
| 05_ciudadDB.js | Manejar ciudades en database (falta PUT)|
| 05_animFunc.js | Manejar animales en memoria (lista JSON)|
+----------------+-----------------------------------------+

*/

//const express= require('express'); // Framework (instalado con npm)
import express from 'express'; // Framework (instalado con npm)

const miAPI=express(); // Crear el servicio API es sencillo
const PUERTO = 3000; // Para mayor claridad, se define el puerto de escucha

import fauna  from './05_animFunc.js';
import urbano from './05_ciudadDB.js';

///////////
// RUTAS //
///////////

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    console.log('GET en ruta raiz');
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1>');
});

//////////////////////////////////////
//  S E C C I Ó N   C I U D A D E S // 
//////////////////////////////////////

// Metodo GET: para lectura de ciudades
miAPI.get('/civitas', (req, res) => urbano.dameCiudades()
    .then (ciudades => {
            console.log('Piden lista de ciudades y devuelvo', ciudades.length,'elementos');
            res.json(ciudades);
        }
    ));

/*miAPI.get('/civitas', async (req, res) => {
    let ciudades= await urbano.dameCiudades();
    console.log('Piden lista de ciudades y devuelvo', ciudades.length,'elementos');
    res.json(ciudades);
}); */


// Metodo GET: para lectura de datos
miAPI.get('/civitas/:id', async (req, res) => {
    const codigo=req.params.id;
    console.log('Piden ciudad con código', codigo);
    // Buscamos el elemento por su codigo y obtenemos una referencia
    let candidato=await urbano.dameCiudad(codigo);
    if (candidato)
        res.status(302).json(candidato);    
    else
        res.status(404).send('No existe ciudad con código '+codigo);
});

// Metodo POST: para insertar datos
miAPI.post('/civitas', async (req, res) => {
    const detalles=req.query; // Das del nuevo elemento

    if (await urbano.insertaCiudad(detalles))
        res.status(201).send('Insertado');
    else
        res.status(400).send('Petición incorrecta');
});


// Metodo PUT: para modificar datos
miAPI.put('/civitas/:id', (req, res) => {
    const codigo=req.params.id; 
    const detalles=req.query; // Lo que se quiere cambiar
    console.log('Quieren modificar el ciudad con código', codigo);
    const candidato=urbano.dameCiudad(codigo)
    if (candidato) {
        if (modificaCiudad(candidato, detalles))
            res.status(202).send('Elemento modificado');
        else 
            res.status(304).send('No hubo cambios');    
    }
    else
        res.status(404).send('No existe ciudad con código '+codigo);
});

// Metodo DELETE: para eliminar datos
miAPI.delete('/civitas/:id', async (req, res) => {
    const codigo=req.params.id;
    console.log('Quieren borrar la ciudad con código', codigo);
    if (await urbano.eliminaCiudad(codigo))
        res.status(202).send('Elemento eliminado');    
    else
        res.status(404).send('No existe ciudad con código '+codigo);
});

//////////////////////////////////////
//  S E C C I Ó N   A N I M A L E S // 
//////////////////////////////////////
// Metodo GET: para lectura de datos
miAPI.get('/datos', (req, res) => {
    console.log('Piden lista de animales y devuelvo', fauna.animales.length,'elementos');
    res.json(fauna.animales);
});

// Metodo GET: para lectura de datos
miAPI.get('/datos/:id', (req, res) => {
    const codigo=req.params.id;
    console.log('Piden animal con código', codigo);
    // Buscamos el elemento por su codigo y obtenemos una referencia
    const candidato=fauna.dameAnimal(codigo);
    if (candidato)
        res.status(302).json(candidato);    
    else
        res.status(404).send('No existe animal con código '+codigo);
});

// Metodo POST: para insertar datos
miAPI.post('/datos', (req, res) => {
    const detalles=req.query; // Das del nuevo elemento

    if (fauna.agregaAnimal(detalles))
        res.status(201).send('Insertado');
    else
        res.status(400).send('Petición incorrecta');
});


// Metodo PUT: para modificar datos
miAPI.put('/datos/:id', (req, res) => {
    const codigo=req.params.id; 
    const detalles=req.query; // Lo que se quiere cambiar
    console.log('Quieren modificar el animal con código', codigo);
    const candidato=fauna.dameAnimal(codigo)
    if (candidato) {
        if (fauna.modificaAnimal(candidato, detalles))
            res.status(202).send('Elemento modificado');
        else 
            res.status(304).send('No hubo cambios');    
    }
    else
        res.status(404).send('No existe animal con código '+codigo);
});

// Metodo DELETE: para eliminar datos
miAPI.delete('/datos/:id', (req, res) => {
    const codigo=req.params.id;
    console.log('Quieren borrar el animal con código', codigo);
    if (fauna.eliminaAnimal(codigo))
        res.status(202).send('Elemento eliminado');    
    else
        res.status(404).send('No existe animal con código '+codigo);
});
/////////////////////////////////////////////
// Esta función genera respuesta si no existe la ruta especificada por el cliente 
miAPI.use( (req, res) => {    
    res.status(404).send('<h1 style="color:red">404: no encontrado</h1>');        
});

///////////////////////////////////////////
// Establece el puerto de escucha
miAPI.listen(PUERTO, () => {
    console.log(`Escuchando en puerto ${PUERTO}`);
});

/*  Opción de indicar el host que debe emplear
miAPI.listen(PUERTO, 'localhost', () => {
    console.log(`Escuchando en localhost:${PUERTO}`);
});
*/
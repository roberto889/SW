/* 
  05_apiFauna.js  - Implementar API usando un framework llamado EXPRESS
      * Versión simplificada de 05_apiDoble.js (prescidir de Ciudades)
      * Catálogo de animales y número de patas, basado en lista de objetos
     Además:
      * Uso middleware para cotillear mensajes
      * Control de CORS que admite varios orígenes

  Esta API importa código de otro archivo  (ver evolución en Leeme.txt)
*/

//const express= require('express'); // Framework (instalado con npm)
import express from 'express'; // Framework (instalado con npm)

const miAPI=express(); // Crear el servicio API es sencillo
const PUERTO = 3000; // Para mayor claridad, se define el puerto de escucha

import fauna  from './05_animFunc.js';

///////////
// RUTAS //
///////////

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    console.log('GET en ruta raiz');
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1><p>&copy;API de Fauna 2025</p>');
});


//////////////////////////////////////
//  S E C C I Ó N   A N I M A L E S // 
//////////////////////////////////////
// Metodo GET: para lectura de datos

miAPI.get('/datos', (req, res) => {
    console.log('Piden lista de animales y devuelvo', fauna.animales.length,'elementos');
    ponerCabeceraCORS(req, res, false);
    res.json(fauna.animales);
});


// Metodo GET: para lectura de datos
miAPI.get('/datos/:id', (req, res) => {
    const codigo=req.params.id;
    console.log('Piden animal con código', codigo);
    ponerCabeceraCORS(req, res, false);
    // Buscamos el elemento por su codigo y obtenemos una referencia
    const candidato=fauna.dameAnimal(codigo);
    if (candidato)
        res.status(200).json(candidato);
    else
        res.status(404).send('No existe animal con código '+codigo);
});

// Metodo POST: para insertar datos
miAPI.post('/datos', (req, res) => {
    const detalles=req.query; // Das del nuevo elemento
    console.log('Quieren añadir un animal:', detalles, req.body);

    ponerCabeceraCORS(req, res, false);
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
    ponerCabeceraCORS(req, res, false);
    // Buscamos el elemento por su codigo y obtenemos una referencia
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
    ponerCabeceraCORS(req, res, true);
    if (fauna.eliminaAnimal(codigo))
        res.status(202).send('Elemento eliminado');    
    else
        res.status(404).send('No existe animal con código '+codigo);
});

// Método OPTIONS (preflight de CORS: método previo antes de PUT, DELETE y PATCH)
miAPI.options('/datos/:id', (req, res) => {
    console.log('Quieren comprobar preflight de CORS, url=',req.url);
    ponerCabeceraCORS(req, res, true);
    res.status(200).send('Todo bien');    
});

function ponerCabeceraCORS(req, res, especial) {
    const origen=req.header('origin');
    console.log('Origen:', origen);
    // Ponemos la cabecera para manejar CORS
    res.header('Access-Control-Allow-Origin','http://127.0.0.1:5500');
    //res.header('Access-Control-Allow-Origin','http://localhost:8000');
    if (especial) // Manejar preflight request (01:29:47)
        res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
}

/////////////////////////////////////////////
// Esta función genera respuesta si no existe la ruta especificada por el cliente 
miAPI.use( (req, res) => {    
    console.log('Responde ERROR. URL=',req.url, req.baseUrl,req.method);
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
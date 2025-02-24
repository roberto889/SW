/* 
  03_animales.js  - Implementar API usando un framework llamado EXPRESS

  Esta API importa código de otro archivo  (ver evolución en Leeme.txt)

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

const anim= require('./03_animFunc.js');

///////////
// RUTAS //
///////////

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    console.log('GET en ruta raiz');
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1>');
});

// Metodo GET: para lectura de datos
miAPI.get('/datos', (req, res) => {
    console.log('Piden lista de animales y devuelvo', animales.length,'elementos');
    res.json(anim.animales);
});

// Metodo GET: para lectura de datos
miAPI.get('/datos/:id', (req, res) => {
    codigo=req.params.id;
    console.log('Piden animal con código', codigo);
    // Buscamos el elemento por su codigo y obtenemos una referencia
    let candidato=anim.dameAnimal(codigo);
    if (candidato)
        res.status(302).json(candidato);    
    else
        res.status(404).send('No existe animal con código '+codigo);
});

// Metodo POST: para insertar datos
miAPI.post('/datos', (req, res) => {
    detalles=req.query; // Das del nuevo elemento

    if (anim.agregaAnimal(detalles))
        res.status(201).send('Insertado');
    else
        res.status(400).send('Petición incorrecta');
});


// Metodo PUT: para modificar datos
miAPI.put('/datos/:id', (req, res) => {
    codigo=req.params.id; 
    detalles=req.query; // Lo que se quiere cambiar
    console.log('Quieren modificar el animal con código', codigo);
    candidato=anim.dameAnimal(codigo)
    if (candidato) {
        if (anim.modificaAnimal(candidato, detalles))
            res.status(202).send('Elemento modificado');
        else 
            res.status(304).send('No hubo cambios');    
    }
    else
        res.status(404).send('No existe animal con código '+codigo);
});

// Metodo DELETE: para eliminar datos
miAPI.delete('/datos/:id', (req, res) => {
    codigo=req.params.id;
    console.log('Quieren borrar el animal con código', codigo);
    if (anim.eliminaAnimal(codigo))
        res.status(202).send('Elemento eliminado');    
    else
        res.status(404).send('No existe animal con código '+codigo);
});

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
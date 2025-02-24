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

let animales = [
    {codigo:1, nombre:'caballo', patas:4},
    {codigo:2, nombre:'tigre', patas:4},
    {codigo:3, nombre:'merluza', patas:0},
    {codigo:4, nombre:'gallina', patas:2}
];

///////////
// RUTAS //
///////////

let n=0;

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    //console.log('baseUrl ='req.baseUrl);
    console.log('GET en ruta raiz');
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1>');
});

// Metodo GET: para lectura de datos
miAPI.get('/datos', (req, res) => {
    //res.send('Obteniendo datos');
    console.log('Piden lista de animales y devuelvo', animales.length);
    res.status(201).json(animales);
});

// Metodo GET: para lectura de datos
miAPI.get('/datos/:id', (req, res) => {
    codigo=req.params.id;
    console.log('Piden animal con código', codigo);
    let captura=animales.find(item => item.codigo==codigo);
    if (captura) {
        console.log('Encontrado animal:', captura);
        res.json(captura);    
    }
    else {
        console.log('Animal no encontrado');
        res.status(404).send('No exite animal con código '+codigo);
    }
});

// Metodo POST: para insertar datos
miAPI.post('/datos', (req, res) => {
    n=animales.length;
    info=req.query;
    if ('nombre' in info && 'patas' in info) {
        n++;
        let nuevo={codigo:n, nombre:info.nombre, patas:info.patas}
        animales.push(nuevo);
        console.log('Nuevo animal:',info);
        res.status(201).send('Insertado');
    }
    else
    {
        console.log('Error:',info);
        res.status(400).send('Petición incorrecta');
    }
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

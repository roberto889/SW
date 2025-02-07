/* 
  01_animales.js  - Implementar API usando un framework llamado EXPRESS

  Esta API maneja un array de objetos

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
    {codigo:4, nombre:'gallina', patas:2},
    {codigo:5, nombre:'gato', patas:4},
    {codigo:6, nombre:'pato', patas:2},
    {codigo:7, nombre:'perro', patas:4},
    {codigo:8, nombre:'paloma', patas:2},
    {codigo:9, nombre:'vaca', patas:4},
    {codigo:10, nombre:'loro', patas:2},
    {codigo:11, nombre:'elefante', patas:4},
    {codigo:12, nombre:'serpiente', patas:0},
    {codigo:13, nombre:'ciervo', patas:4},
    {codigo:14, nombre:'camello', patas:4},
    {codigo:15, nombre:'cienpies', patas:100},
    {codigo:16, nombre:'araña', patas:8},
    {codigo:17, nombre:'abeja', patas:6},
    {codigo:18, nombre:'mosca', patas:6},
    {codigo:19, nombre:'mosquito', patas:6},
    
];

///////////
// RUTAS //
///////////

let n=0;

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    console.log('GET en ruta raiz');
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1>');
});

// Metodo GET: para lectura de datos
miAPI.get('/datos', (req, res) => {
    console.log('Piden lista de animales y devuelvo', animales.length);
    res.status(201).json(animales);
});

// Metodo GET: para lectura de datos
miAPI.get('/datos/:id', (req, res) => {
    codigo=req.params.id;
    console.log('Piden animal con código', codigo);
    let captura=animales.find(item => item.codigo==codigo);
    if (captura) {
        console.log('actualizado su animal:', captura);
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
// miAPI.put('/datos', (req, res) => {
//     res.send('Actualizando datos');
// });

// Metodo PUT: para modificar datos
miAPI.put('/datos/:codigo', (req, res) => {
    const num = req.params.codigo; // Obtiene el código del animal desde los parámetros de la URL
    const index = animales.findIndex(item => item.codigo == num); // Busca el índice del animal en el array `animales`
    if (index !== -1) { // Si el animal existe
        animales[index] = { ...animales[index], ...req.body }; // Actualiza los datos del animal con los datos del cuerpo de la solicitud
        res.send('Datos actualizados'); // Envía una respuesta indicando que los datos fueron actualizados
    } else { // Si el animal no existe
        res.status(404).send('Datos no encontrados'); // Envía una respuesta indicando que los datos no fueron encontrados
    }
});

// Metodo DELETE: para eliminar datos
// miAPI.delete('/datos', (req, res) => {
//     n=animales.findIndex(item => item.codigo==num);
//     res.send('Borrando datos');
// });
// Metodo DELETE: para eliminar datos
miAPI.delete('/datos/:codigo', (req, res) => {
    const num = req.params.codigo; // Obtiene el código del animal desde los parámetros de la URL
    const index = animales.findIndex(item => item.codigo == num); // Busca el índice del animal en el array `animales`
    if (index !== -1) { // Si el animal existe
        animales.splice(index, 1); // Elimina el animal del array `animales`
        res.send('Borrando datos'); // Envía una respuesta indicando que los datos fueron eliminados
    } else { // Si el animal no existe
        res.status(404).send('Datos no encontrados'); // Envía una respuesta indicando que los datos no fueron encontrados
    }
});

// Esta función genera respuesta si no existe la ruta que especifica el cliente 
miAPI.use( (req, res) => {    
    res.status(404).send('<h1 style="color:red">404: no encontrado</h1>');        
});

///////////////////////////////////////////
// Establece el puerto de escucha
miAPI.listen(PUERTO, () => {
    console.log(`Escuchando en puerto ${PUERTO}`);
});
/*
miAPI.listen(PUERTO, 'localhost', () => {
    console.log(`Escuchando en localhost:${PUERTO}`);
});
*/
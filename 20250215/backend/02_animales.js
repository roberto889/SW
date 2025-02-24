/* 
  02_animales.js  - Implementar API usando un framework llamado EXPRESS

  Esta API maneja un array de objetos (ver evolución en Leeme.txt)

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
    {codigo:5, nombre:'gorrión', patas:3}, // Error en patas (para modificar)
    {codigo:6, nombre:'SPIDER', patas:8},  // Nombre inadecuado (para modificar)
    {codigo:7, nombre:'serpiente', patas:0},
    {codigo:8, nombre:'nutria', patas:4},
    {codigo:9, nombre:'mosca', patas:6},
];

///////////
// RUTAS //
///////////

let n=animales.length; // Inicializa el contador

// Raíz: tratamiento de la ruta principal
miAPI.get('/', (req, res) => {
    console.log('GET en ruta raiz');
    res.send('<h1 style="color:green">¡¡Bienvenido!!</h1>');
});

// Metodo GET: para lectura de datos
miAPI.get('/datos', (req, res) => {
    console.log('Piden lista de animales y devuelvo', animales.length,'elementos');
    res.json(animales);
});

// Metodo GET: para lectura de datos
miAPI.get('/datos/:id', (req, res) => {
    codigo=req.params.id;
    console.log('Piden animal con código', codigo);
    // Buscamos el elemento por su codigo y obtenemos una referencia
    let candidato=dameAnimal(codigo);
    if (candidato) {
        res.status(302).json(candidato);    
    }
    else {
        res.status(404).send('No existe animal con código '+codigo);
    }
});

// Metodo POST: para insertar datos
miAPI.post('/datos', (req, res) => {
    //n=animales.length; // ERROR, QUITAR ESTA LÍNEA (mal planteada) 
    detalles=req.query; // Das del nuevo elemento
    if ('nombre' in detalles && 'patas' in detalles) {
        n++; // Incrementa el contador
        // Crea el objeto incluyendo su código y los datos
        let nuevo={codigo:n, nombre:detalles.nombre, patas:parseInt(detalles.patas)};
        animales.push(nuevo); // Agregar al conjunto
        console.log('Nuevo animal:',detalles);
        res.status(201).send('Insertado');
    }
    else {
        console.log('Error:',detalles);
        res.status(400).send('Petición incorrecta');
    }
});

/*
miAPI.put('/datos', (req, res) => {
    res.send('Actualizando datos');
});
*/

// Metodo PUT: para modificar datos
miAPI.put('/datos/:id', (req, res) => {
    codigo=req.params.id; 
    detalles=req.query; // Lo que se quiere cambiar
    console.log('Quieren modificar el animal con código', codigo);
    candidato=dameAnimal(codigo)
    if (candidato) {
        let cambiado=false;
        // Comprueba si debe cambiar nombre
        if ('nombre' in detalles && detalles.nombre!=candidato.nombre) {
            candidato.nombre=detalles.nombre;
            cambiado=true;
        }
        // Comprueba si debe cambiar patas
        if ('patas' in detalles && detalles.patas!=candidato.patas) {
            candidato.patas=parseInt(detalles.patas);
            cambiado=true;
        }
        if (cambiado)
            res.status(202).send('Elemento modificado');
        else 
            res.status(304).send('No hubo cambios');    
    }
    else
        res.status(404).send('No existe animal con código '+codigo);
});

// Buscamos el elemento por su codigo y obtenemos una referencia
function dameAnimal(codigo) {
    let captura=animales.find(item => item.codigo==codigo);
    if (captura)
        console.log('Encontrado animal:', captura);
    else
        console.log('Animal no encontrado');
    return captura;
}

/*
// Metodo DELETE: para eliminar datos
miAPI.delete('/datos', (req, res) => {
    //n=animales.findIndex(item => item.codigo==num);
    res.send('Borrando datos');
});
*/

// Metodo DELETE: para eliminar datos
miAPI.delete('/datos/:id', (req, res) => {
    codigo=req.params.id;
    console.log('Quieren borrar el animal con código', codigo);
    // Buscamos el índice del elemento que deseamos borrar
    let indice=animales.findIndex(item => item.codigo==codigo);
    if (indice != -1) {
        console.log('Encontrado el índice=', indice);
        animales.splice(indice, 1); // En esa posicion elimina un solo elemento
        res.status(202).send('Elemento eliminado');    
    }
    else {
        console.log('Animal no encontrado');
        res.status(404).send('No existe animal con código '+codigo);
    }
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
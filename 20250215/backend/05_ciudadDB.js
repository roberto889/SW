// https://www.npmjs.com/package/mysql2

import mysql from 'mysql2/promise'
//const mysql =require('mysql2/promise');

const repositorio2 = {
    host: '192.168.1.243',
    user: 'TestUser',
    password: 'P@ssw0rd',
    database: 'world'
}

const repositorio = {
    host: '10.57.22.106',
    //host: 'localhost',
    user: 'burro',
    password: 'itet2024',
    database: 'world'
}

const conexion = await mysql.createConnection(repositorio);
//---------------------------------------------------------------

// Busca el elemento por su codigo y obtiene una referencia
async function damePaisesFiltro(continente) {
    const filtro=[continente];
    const [respuesta] = await conexion.query ("SELECT name FROM country WHERE continent=?;", filtro);
    console.log('dameCiudades() obtiene %d ciudades', respuesta.length);
    return respuesta;
}

// Busca el elemento por su codigo y obtiene una referencia
async function dameCiudades() {
    const filtro=['S','ESP'];
    const [respuesta] = await conexion.query ("SELECT id,Name, District, Population as Tiempo FROM city WHERE LEFT(Name,1)=? AND CountryCode=?;", filtro);
    console.log('dameCiudades() obtiene %d ciudades', respuesta.length);
    return respuesta;
}



// Busca el elemento por su codigo y obtiene una referencia
async function dameCiudad(codigo) {
    const [captura] = await conexion.query ("SELECT id,Name, District, Population FROM city WHERE id=?;", [codigo]);
    if (captura.length!=0)
        console.log('Encontrada ciudad:', captura);
    else
        console.log('Ciudad no encontrada');
    return captura;
}

// Añade una nueva ciudad en la base de datos
async function insertaCiudad(campos) {
    const sentenciaSQL="insert into city (Name, CountryCode, District, Population) values (?,?,?,?);";

    let codigoPais='ESP'; // Valor por defecto (España)
    if ('CountryCode' in campos) // Posibilidad de indicar otro país
        codigoPais = campos.CountryCode;

    console.log("Sentencia:",sentenciaSQL);
    // Comprobación de que se indican todos los campos
    if ('Name' in campos && 'District' in campos && 'Population' in campos) {
        const [resultado] = await conexion.query (sentenciaSQL,
            [campos.Name, codigoPais,
             campos.District, parseInt(campos.Population)]);
        console.log('Nuevo animal:', resultado);
        if ('affectedRows' in resultado) {
            if (resultado.affectedRows == 1)
            {
                console.log('Nueva ciudad:', resultado.insertId);
                return true;
            }
        }
        console.log('Error al insertar registro');
        return true;
    }
    else {
        console.log('Error insertando:',campos);
        return false;
    }
}

// Intenta eliminar una ciudad de la lista, buscando el código
async function eliminaCiudad(codigo) {
    const sentenciaSQL="delete from world.city where id=?;";
    // Buscamos el índice del elemento que deseamos borrar
    const [resultado] = await conexion.query (sentenciaSQL, codigo);
    //console.log('Resultado:', resultado);
    //console.log('Afectado:', resultado.affectedRows);

    if ('affectedRows' in resultado) {
        if (resultado.affectedRows == 1)
            return true;
    }
    console.log('Ciudad no encontrada');
    return false;
}

// Intenta cambiar los datos de una Ciudad
// Puede fallar si el codigo de la ciudad no existe o si
// el usuario no tiene privilegios para hacer update.
// Otro fallo puede ocurrir si los campos son inadecuados 
function modificaCiudad(candidato, campos) {
    let cambiado=false;
    // Comprueba si debe cambiar nombre
    if ('nombre' in campos) {
        candidato.nombre=campos.nombre;
        cambiado=true;
    }
    // Comprueba si debe cambiar la población
    if ('habitantes' in campos) {
        candidato.habitantes=parseInt(campos.habitantes); // Convierte a número !!!
        cambiado=true;
    }
    return cambiado;
}

///////////////////////////////////////////////
// Exportar los elementos públicos que va a usar la API
/*
module.exports = {
    dameCiudades,
    dameCiudad,
    insertaCiudad,
    modificaCiudad,
    eliminaCiudad
}*/

const urbano = {
    damePaisesFiltro,
    dameCiudades,
    dameCiudad,
    insertaCiudad,
    modificaCiudad,
    eliminaCiudad
}

//module.exports = urbano;
export default urbano;

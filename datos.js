 const mysql = require('mysql');
//import { createConnection } from 'mysql';
//const { PassThrough } = require('stream');

let datos_conexion = {
    host: 'localhost',
    user: 'burro',
    password: 'P@ssw0rd',
    database: 'prueba'
    //database: 'world'
};

let objeto=null;


function conectar() {
    let conexion = mysql.createConnection(datos_conexion);

    conexion.connect((err) => {
        if(err){
            console.log('Error de conexion:', err);
            return;
        }
        console.log('Conexion establecida con exito ', datos_conexion.database);
    });

    conexion.query('SELECT * FROM producto', (err, rows) => {
        if(err){
            console.log('Error en la consulta:', err);
            return;
        }
        console.log('Consulta realizada con exito');
        console.log(rows);

        objeto=JSON.stringify(rows);
});
    
    return conexion;
}


function leer(conx_db)
{
    return objeto;

}


module.exports = { conectar, leer };

const http=require('node:http');
const { conectar, leer } = require('./datos.js');

//import { conectar, leer } from './datos.js';

let tienda=[
    {nombre:'Pera', precio:2, tipo: 'Fruta'},
    {nombre:'Manzana', precio:1.5, tipo: 'Fruta'},
    {nombre:'Salchichas', precio:34.2, tipo: 'Carne'},
    {nombre:'Pollo', precio:12.3, tipo: 'Carne'},
];

db_conexion=conectar();

let cont=0;
http.createServer(function(req,res){
    //res.writeHead(200,{'content type':'text / plain'});
    cont++;
    console.log('llega una solicitud #', cont);
res.writeHead(200,{'content-Type':'aplication/json',
      'access-control-allow-origin':'http://localhost:8000',
});
    //res.write(JSON.stringify(tienda));
    let respuesta=leer(db_conexion);
    res.write(respuesta);
    console.log('Solicitud numero',cont,'-',req.url);
    res.end();
}).listen(3000);

//Api de ejemplo//

const http=require('http');

let cont=0;
http.createServer(function(req,res){
    cont++;
    let pregunta=req.url;

    console.log('llega una solicitud #', cont, '-', pregunta);
    res.writeHead(200,{'content-Type': 'text/plain;charset=utf-8'});
    //res.writeHead(200,{'content-Type': 'text/plain,'});
    res.write('Adiós compañeros');
    res.end(); 
}).listen (3000, 'localhost', () => {
    console.log('Escuchando en localhost:3000');
})
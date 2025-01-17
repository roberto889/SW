
const http = require('http');
let cont=0;

http.createServer(function(req, res) {
    cont++;
    let pregunta=req.url;
    console.log('Llega una solicitud #',cont, '-', pregunta);
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Adiós compañeros');
    res.end();    
})
.listen(3000, 'localhost', () => {
    console.log('Servidor corriendo en http://localhost:3000/');
});
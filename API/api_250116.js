
//Api de ejemplo//

const http=require('http');

let cont=0;
http.createServer(function(req,res){
    cont++;
    let pregunta=req.url;

    console.log('llega una solicitud #', cont, '-', pregunta);
    if (pregunta.startsWith('/eco='))
    {
        let= largo= pregunta.length;
        let= lugar=pregunta.search('=');
        respuesta=`Has dicho '${pregunta.substring(lugar+1,largo)}'`;
        let= spc="%20";
        respuesta=respuesta.replace(spc,' ');
        respuesta=respuesta.replace(/%20/g, ' '); // Reemplaza '%20' con espacio

        // respuesta.replace('%20',' ');
        console.log(respuesta);
        console.log(spc.length);
    }
    else 
    respuesta= "No se que dices";




    res.writeHead(200,{'content-Type': 'text/plain;charset=utf-8'});
    //res.writeHead(200,{'content-Type': 'text/plain,'});
    res.write(respuesta);
    res.end(); 
}).listen (3000, 'localhost', () => {
    console.log('Escuchando en localhost:3000');
})
const { subscribe } = require('diagnostics_channel');
const http = require('http');
const { json } = require('stream/consumers');

let cont=0;
http.createServer(function(req, res) {
    cont++;
    let pregunta=req.url;
    console.log('Llega una solicitud #',cont, '-', pregunta);

    /*
    if (pregunta.startsWith('/eco='))
        respuesta=devuelveEco(pregunta);
    else
        respuesta="No sé qué dices";
    */
    
    let comando = 'Nada';
    let jotason=false;
    
    if (pregunta[0]=='/')
    {
        lugar=pregunta.search('=');
        comando=pregunta.substring(1,lugar);
    }

    switch (comando)
    {
        case 'eco':
            respuesta=devuelveEco(pregunta);
            break;
        case 'operacion':
            respuesta=operacion(pregunta);
            break;
        case 'belleza':
            respuesta=hermosura();
            jotason=true;
        break;
            default:
            respuesta="No sé qué dices";
    }

    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    if (jotason)
        res.writeHead(200, { 'Content-Type': 'application/json' });
    else
        res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });

    res.write(respuesta);
    res.end();    

}).listen(3000, 'localhost', () => {
    console.log('Escuchando en localhost:3000');
});

function devuelveEco(pregunta)
{
    let largo=pregunta.length;
    let lugar=pregunta.search('=');
    respuesta=`Has dicho '${pregunta.substring(lugar+1,largo)}'`;
    console.log(respuesta);
    respuesta=respuesta.replaceAll('%20',' ');
    console.log(respuesta);

    return respuesta;
}

function operacion(datos)
{
    console.log('Datos de entrada en operacion(): ',datos);
    if (datos.indexOf('+')>0)
    {
        respuesta='Es una suma';
    }
    else
        respuesta='Operación desconocida';

    return respuesta;
}

guapas = [
    {nombre:'Marilyn Monroe', nace:1956},
    {nombre:'Ava Gardner', nace:1947},
    {nombre:'Scarlett Johansson', nace:1998}
];

function hermosura()
{
    return JSON.stringify(guapas);
}
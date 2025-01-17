/*
codigo del servidor web (15 de enero)
hay un menu inicial con varias opciones
- operacion: permite calcular 
- belleza: lista de chicas guapas
- saludo: un mensaje HTML

*/


const { subscribe } = require('diagnostics_channel');
const { access } = require('fs');
const http = require('http');
const { json } = require('stream/consumers');

let cont=0;
http.createServer(function(req, res) {
    cont++;
    let pregunta=req.url;
    console.log('Llega una solicitud #',cont, '-', pregunta);
    console.log('\thostname:',req.hostname);
    console.log('\tprotocol:',req.protocol);
    console.log('\t

    
    // if (pregunta.startsWith('/eco='))
    //     respuesta=devuelveEco(pregunta);
    // else
    //     respuesta="No sé qué dices";
    // 
    
    let comando = 'Nada';
    let jotason=false, formatoHTML=false;
    let largo=pregunta.length;
    let lugar=pregunta.search('=');
    
    if (pregunta[0]=='/')
    {
        if (lugar==-1)  lugar=largo;
        comando=pregunta.substring(1,lugar);
        console.log('largo:',largo);
        if (largo == 1) 
            comando = 'inicio';
            
        else
            pregunta=pregunta.substring(lugar+1,largo);
    }

    switch (comando)
    {
        case 'inicio':
            respuesta=inicio();
            formatoHTML=true;
            break;
        case 'eco':
            respuesta=devuelveEco(pregunta);
            break;
        case 'operacion':
            if (lugar==largo)
                respuesta="No hay datos";
            else
                respuesta=operacion(pregunta);
            break;
        case 'belleza':
                respuesta=hermosura();
                jotason=true;
                formatoHTML=true;
            break;
        case 'saludo':
            respuesta=saludar();
            formatoHTML=true;
            // jotason=true;
            break;
        default:
            //respuesta="No sé qué dices";
            respuesta=mensaje('No sé qué dices','red');
            formatoHTML=true;
            break
    }

    //res.writeHead(200, { 'Content-Type': 'text/plain' });
    // if (jotason) {
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    // } else if (formatoHTML) {
    //     res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    // } else {
        res.writeHead(200, { 'Content-Type': tipoContenido [tipo] ,
            'access-control-allow-origin': 'http://localhost:3000',
        });
    

    
    res.write(respuesta);
    res.end();    

}).listen(3000, 'localhost', () => {
    console.log('Escuchando en localhost:3000');
});


function devuelveEco(pregunta) {
    let largo = pregunta.length;
    let lugar = pregunta.search('=');
    let respuesta = `Has dicho '${pregunta.substring(lugar + 1, largo)}'`;
    console.log(respuesta);
    respuesta = respuesta.replaceAll('20', ' ');
    console.log(respuesta);
    return respuesta;
}

function operacion(datos) {
    console.log('Datos de entrada en operacion(): ', datos);
    let respuesta;
    try {
        // Evaluar la expresión matemática
        let resultado = eval(datos);
        respuesta = `El resultado de la operación ${datos} es ${resultado}`;
    } catch (error) {
        respuesta = 'Operación desconocida o error en la expresión';
    }
    return respuesta;
}


const guapas = [
    {nombre:'Marilyn Monroe', nace:1956},
    {nombre:'Ava Gardner', nace:1947},
    {nombre:'Scarlett Johansson', nace:1998}
];

function hermosura() {
        let html = '<html><head><title>Lista de Chicas Guapas</title></head><body>';
        html += '<h1>Lista de Chicas Guapas</h1><ul>';
        guapas.forEach(guapa => {
            html += `<li>${guapa.nombre} (nacida en ${guapa.nace})</li>`;
        });
        html += '</ul></body></html>';
        return html;
    }

function saludar() {
    return '<p>Hola, <b style="color:green">amigos</b></p>';
}


function mensaje(texto, color) {
    return `<p> Mensaje: <b style="color:${color}">${texto}</b></p>`;
}
function inicio ()
{
    let pagina= '<h1>Menu de Inicio</h1>';
    pagina += '<ul>';
    pagina += '<li>Uno</li>';
    pagina += '<li>Dos</li>';
    pagina += '<li>Tres</li>';
    pagina += '</ul>';

    return pagina;
}
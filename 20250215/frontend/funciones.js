let host = 'localhost';
let port = 3000;

function cargarPaginaEnCaja(idCaja, opcion) {

    grupo=document.getElementsByName('opciones');
    // console.log('grupo', grupo);
    console.log('valor', grupo.value);
    const url= grupo.value+opcion+'.html';

    fetch(url)  // Obtener la página web
        .then(res => res.text()) // Extraer la información
        .then(pagina => {  // Depositarla en la ubicación seleccionada
            document.getElementById(idCaja).innerHTML = pagina;
        })
        .catch(error => {
            console.error('Error al cargar la página:', error);
        });
}

// Obtiene una página web concreta y rellena el div llamado resultado
function cargarCosa() {
    // const url= 'cosa.html';
    const url= 'maqueta.html';
    fetch(url)  // Obtener la página web
        .then(res => res.text()) // Extraer la información
        .then(pagina => {  // Depositarla en la ubicación seleccionada
            document.getElementById('resultado').innerHTML = pagina;
        })
        .catch(error => {
        console.error('Error al cargar la página:', error);
        });
}

function cargarDatos(selector) {
    if (!selector) {
        console.log('Llamada a cargarDatos() sin indicar el selector');
        // Assert - meessage
        alert("Por favor, introduce un número válido.");
        return;
    }
    console.log('cargarDatos(',selector,')');
    const codigo = document.querySelector(selector).value;

    if (!codigo || codigo.length==0) {
        console.log('Llamada a cargarDatos() halla problemas en el selector');
        alert("Por favor, introduce un número válido.");
        return;
    }

    let opcion = 'datos'; // Por defecto usar el API de animales

    // Completa la url poniendo el código al final
    let url = `http://${host}:${port}/${opcion}/${codigo}`; // URL completa
    console.log(`cargarDatos() --> ${url}`);
    fetch(url)  // Obtener los datos (por defecto el method es GET)
        .then(res => res.json()) // Extraer la información
        .then(datos => {
            console.log(datos);
                // Prepara una lista con todos los campos del elemento
                document.querySelector('#nombre').value = datos.nombre;
                document.querySelector('#patas').value  = datos.patas;
        })
        .catch(error => {
        console.error('Error al cargar datos', error);
        });
}


function cargarResultado(clave) {
    let tieneClave=false;
    if (clave) tieneClave=true;
    
    console.log(clave);
    let url = `http://${host}:${port}/datos`; // URL básica
    if (clave) {
        const codigo = document.querySelector(clave).value;
        url+='/'+codigo; // Completa la url poniendo el código al final
        console.log('Leer animal con codigo=',codigo);
    }
    console.log(`cargarResultado() --> ${url}`);
    fetch(url)  // Obtener los datos (por defecto el method es GET)
        .then(res => res.json()) // Extraer la información
        .then(datos => {  
            let miTabla = '<table border=1><thead><tr><th>Código</th><th>Nombre</th><th>Patas</th></tr></thead><tbody>';
            // Datos puede traer una lista o sólo un elemento
            if (clave) datos=[datos]; // Crea una lista de solo un elemento
            let n=datos.length; // Cuantos elementos tiene
            console.log(datos, n);
            for(let i=0; i<n; i++)
            {
                const item=datos[i];
                // Prepara una lista con todos los campos del elemento
                let lista=[item.codigo];
                lista.push(item.nombre);
                lista.push(item.patas);
                console.log(lista);
                miTabla += generaFila(lista);
            }
            miTabla += '</tbody></table>';
            // Depositarla en la ubicación seleccionada
            document.getElementById('resultado').innerHTML = miTabla;
            //const contenedor = document.querySelector("#resultado"); // Alternativa
        })
        .catch(error => {
        console.error('Error al cargar la página:', error);
        });
}

function generaFila(lista)
{
    let miFila = '<tr>'; // Empieza la fila
    for (let i=0;i<lista.length;i++)
        miFila += `<td> ${lista[i]} </td>`;
    miFila += '</tr>'; // Final de fila

    return miFila;
}

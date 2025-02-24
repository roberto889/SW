// https://www.npmjs.com/package/mysql2

import mysql from 'mysql2/promise'

const repositorio = {
    host: '192.168.1.243',
    user: 'TestUser',
    password: 'P@ssw0rd',
    database: 'world'
}


const repositorio2 = {
    host: '10.57.22.106',
    user: 'burro',
    password: 'itet2024',
    database: 'world'
}

const conexion = await mysql.createConnection(repositorio);

const [respuesta, campos] = await conexion.query ('SELECT COUNT(*) AS cuenta FROM city;');
console.log('respuesta: ',respuesta);
console.log('campos:', campos);

let [resp] = await conexion.query ("SELECT COUNT(*) AS cuenta FROM city WHERE LEFT(Name,1)='S';");
console.log('------\n',resp);

console.log('------\n');
[resp] = await conexion.query ("SELECT id,Name, District, Population FROM city WHERE LEFT(Name,1)=? AND CountryCode=?;", 
    ['T','ESP']);
console.log('------\n',resp);
let n=resp.length;

for (let i=0; i<n; i++) {
    let c=resp[i]; // Para cada ciudad obtenida
    console.log(`${c.id} - ${c.Name} (${c.District}): ${c.Population} habs.`);
}

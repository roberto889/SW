// https://www.npmjs.com/package/mysql2

import mysql from 'mysql2/promise'

const repositorio = {
    host: 'localhost',
    user: 'burro',
    password: 'P@ssw0rd',
    database: 'world'
}

const conexion = await mysql.createConnection(repositorio);

const [respuesta, campos] = await conexion.query ('SELECT COUNT(*) AS cuenta FROM city;');
console.log(respuesta);
console.log(campos);

let [resp] = await conexion.query ("SELECT COUNT(*) AS cuenta FROM city WHERE LEFT(Name,1)='S';");
console.log('------\n',resp);

console.log('------\n');
[resp] = await conexion.query ("SELECT Name, District, Population FROM city WHERE LEFT(Name,1)=? AND CountryCode=?;", ['S','ESP']);
console.log('------\n',resp);
let n=resp.length;

for (let i=0; i<n; i++) {
    let c=resp[i]; // Para cada ciudad obtenida
    console.log(`${c.Name} (${c.District}): ${c.Population} habs.`);
}

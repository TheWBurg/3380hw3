//import customer from '../tables.js';
//const fetch = require('node-fetch');

//var format = require('pg-format');
//const { getSystemErrorMap } = require('util');



/*
const client = new Pool({
    host: creds.host,
    user: creds.user,
    password: creds.password,
    port: creds.port,
    database: creds.database
  });
*/
let currentTable = []

const setTable = (table) => {
    for (const [key, value] of Object.entries(table)) {
        document.write(`${key}: ${value} `);
    }
    document.write('\n');
}
async function getTable(){
    //var table_name = prompt("Enter a table to fetch","test");

    try{
        //var input = prompt("Please enter table name", "test");
        const response = await fetch(`http://localhost:5000/select/${table_name}`);

        // prompt asks for table name
        // fetch calls a backend function using the table name as a prarameter
        // the backend function calls the database and returns all of the information from that query
        // the fetch function returns that information into the response variable as json encoded text
        // the .json function converts that encoded text into a javascript object
        // now we are in the front end and we do whatever want with that object 


            /*
            method:"GET",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(body)
            */
        //});
        const table = await response.json();
        for (let i=0; i < table.length; i++){
            setTable(table[i]);
            document.write('\n');
        }
        

        //document.write(table[0]);
    }
    catch(err){

        //document.write(err.message);
        console.log(err.message);
    }
    
   
    
}



async function main(){

}
main();
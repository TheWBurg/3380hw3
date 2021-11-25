const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./creds');
app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());   

 
//async function getTable(table_name){
app.get('/select/:table_name', async function (req, res) {
    try{
        const {table_name} = req.params;
        const table = await pool.query(`Select * From ${table_name}`);
        console.log(table.rows);
        res.json(table.rows);
    }
    catch(err){
        console.log(err.message);
    }
    
});

//async function getTable(table_name){
app.get('/select/:customers', async function (req, res) {
    try{
        const {customers} = req.params;
        const table = await pool.query(`Select * From ${customers}`);
        console.log(table.rows);
        res.json(table.rows);
    }
    catch(err){
        console.log(err.message);
    }
});

// the frontend code makes a request to the backend to give details about the customer to the server 
// this takes the json string and turns it into an object
// the body holds the string 
app.post('/addCustomer', async function (req, res)
{
    console.log('Got addCustomer body:', req.body);
    // c is thisCustomer
    let c = req.body; 

    try 
    {
        var q = await pool.query
        (
            `BEGIN;
                INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
                VALUES (${c.ssn}, ${c.first_name}, ${c.last_name}, ${c.email}, ${c.phone_num});
            END;`
        );
    }
    catch(err) {console.log(err.message);}
    console.log(q.rows);
    //var r = JSON.stringify(q.rows)

    // send stuff back to frontend
    res.json(q.rows);
    //res.sendStatus(200);
    console.log("Added a customer to the database");
    return; 
});

app.post('/searchFlight', async function (req, res)
{
    console.log('Got searchFlight body:', req.body);
    // c is thisCustomer
    let f = req.body; 

    try 
    {
        var q = await pool.query
        (
            `SELECT * FROM flight WHERE 
            departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${f.departureAirport}')
            AND 
            arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${f.arrivalAirport}');`
        );
    }
    catch(err) {console.log(err.message);}
    console.log(q.rows);
    //var r = JSON.stringify(q.rows)

    // send stuff back to frontend
    res.json(q.rows);
    //res.sendStatus(200);
    console.log("Added a customer to the database");
    return; 
});

app.post('/buyTicket', async function (req, res)
{
    console.log('Got buyTicket body:', req.body);
    // c is thisCustomer
    let t = req.body; 

    try 
    {
        var q = await pool.query
        (
            `SELECT * FROM flight WHERE 
            departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${f.departureAirport}')
            AND 
            arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${f.arrivalAirport}');`
        );
    }
    catch(err) {console.log(err.message);}
    console.log(q.rows);
    //var r = JSON.stringify(q.rows)

    // send stuff back to frontend
    res.json(q.rows);
    //res.sendStatus(200);
    console.log("Added a valid ticket to the database");
    return; 
});

//}
/*
app.post('/', async function (req, res) {
    
});
*/
var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});


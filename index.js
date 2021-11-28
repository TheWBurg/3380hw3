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
app.post('/addCustomer', async function (req, res) {
    console.log('Got addCustomer body:', req.body);
    // c is thisCustomer
    let c = req.body; 
    let q
    try {
        q = await pool.query (
            `BEGIN;
                INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
                VALUES ('${c.ssn}', '${c.first_name}', '${c.last_name}', '${c.email}', '${c.phone_num}');
            END;`
        );
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message);
        return; 
    }

    // send stuff back to frontend
    res.json('Success');
    //res.sendStatus(200);
    console.log("Added a customer to the database");
    return; 
});

app.post('/searchFlight', async function (req, res) {
    console.log('Got searchFlight body:', req.body);
    // c is thisCustomer
    let f = req.body; 
    let q
    try {
        q = await pool.query(
            `SELECT * FROM flight WHERE 
            departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${f.departureAirport}')
            AND 
            arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${f.arrivalAirport}');`
        );
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
    }
    console.log(q.rows);
    //var r = JSON.stringify(q.rows)

    // send stuff back to frontend
    res.json(q.rows);
    //res.sendStatus(200);
    console.log("Returned flight(s) from database");
    return; 
});

app.post('/saveTicketInfo', async function (req, res) {
    console.log('Got buyTicket body:', req.body);
    let q
    var t = req.body
    let seatsLeftDict = {
        economy: "economy_seat_left",
        business: "business_seat_left",
        first: "first_class_seat_left"
    }
    //console.log(t)
    let query = `BEGIN TRANSACTION;\n`
    for(i = 0; i < t.length; i++) {
        query = query + 
        `WITH ins${i} AS (
        INSERT INTO boarding_pass (flight_id, gate_code, class_type, num_bags)
        VALUES (${t[i].flightID}, (SELECT departure_gate_code FROM flight WHERE flight_id = ${t[i].flightID}), '${t[i].classType}', ${t[i].numBags})
        RETURNING ticket_no)
    
        INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, flight_id, is_cancelled)
        VALUES ((SELECT ticket_no FROM ins${i}), '${t[i].ssn}', '${t[i].creditCardNum}', 'NA', '${t[i].discountCode}', ${t[i].totalCost}, ${t[i].flightID}, FALSE);
        
        UPDATE flight
        SET ${seatsLeftDict[t[i].classType]}  = (SELECT  ${seatsLeftDict[t[i].classType]} FROM flight WHERE flight_id = ${t[i].flightID}) - 1
        WHERE flight_id = ${t[i].flightID};\n`
    }
    query = query + `END TRANSACTION;`
    console.log(query)
    try {
        q = await pool.query(`${query}`);
    }
    catch(err) {
        console.log(err.message);
        res.json("Error: Could not add valid ticket(s) to the database")
        return;
    }
    //console.log(q.rows);
    //res = JSON.stringify(q.rows)

    // send stuff back to frontend
    res.json("Successfully bought tickets");
    //res.sendStatus(200);
    console.log("Added valid ticket(s) to the database");
    return; 
});

app.post('/ticketBasePrice', async function (req, res) {
    console.log('Got ticketBasePrice body:', req.body);
    let f = req.body; 
    let q

    try {
        q = await pool.query (
            `SELECT base_ticket_cost 
            FROM flight
            WHERE flight_id = ${f.flightID};`
        );
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return; 
    }
    console.log(q.rows);

    // send stuff back to frontend
    res.json(q.rows);
    //res.sendStatus(200);
    console.log("Got flight_id base cost");
    return; 
});

app.post('/discountInfo', async function (req, res) {
    console.log('Got discountInfo body:', req.body);
    let d = req.body; 
    let q

    try {
        q = await pool.query (
            `SELECT discount_amount, discount_type 
            FROM discount
            WHERE discount_code = '${d.discountCode}';`
        );
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    console.log(q.rows);
    //var r = JSON.stringify(q.rows)

    // send stuff back to frontend
    res.json(q.rows);
    //res.sendStatus(200);
    console.log("Got discount_amount and discount_type");
    return; 
});

app.post('/checkSSN', async function (req, res) {
    console.log('Got checkSSN body:', req.body);
    let c = req.body; 
    let q

    try {
        q = await pool.query (
            `SELECT ssn 
            FROM customer
            WHERE ssn = '${c.ssn}';`
        );
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    console.log(q.rowCount);
    // send stuff back to frontend
    res.json(q.rowCount);
    //res.sendStatus(200);
    console.log("Checked SSN");
    return; 
});

app.post('/checkTicket', async function (req, res) {
    console.log('Got checkTicket body:', req.body);
    let t = req.body; 
    let q

    try {
        q = await pool.query (
            `SELECT ticket_no, ssn
            FROM payment
            WHERE ticket_no = ${t.ticket_no} AND ssn = '${t.ssn}';`
        );
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    console.log(q.rowCount);
    // send stuff back to frontend
    res.json(q.rowCount);
    //res.sendStatus(200);
    console.log("Checked Ticket");
    return; 
});
app.post('/getTicketDetails', async function (req, res) {
    console.log('Got getTicketDetails body:', req.body);
    let t = req.body; 
    let q
    try {
        q = await pool.query (
            `SELECT
            boarding_pass.ticket_no, boarding_pass.flight_id, boarding_pass.class_type, boarding_pass.num_bags, 
            payment.final_price, payment.is_cancelled, 
            flight.departure_airport_id, flight.arrival_airport_id, flight.sch_departure_time, flight.sch_arrival_time, 
            flight.status, flight.departure_gate_code, flight.arrival_gate_code,
            depAirport.airport_name, depAirport.airport_city, 
			arAirport.airport_name, arAirport.airport_city

            FROM boarding_pass

            INNER JOIN payment ON boarding_pass.ticket_no = payment.ticket_no
            INNER JOIN flight ON boarding_pass.flight_id = flight.flight_id
            INNER JOIN airport depAirport ON flight.departure_airport_id = depAirport.airport_id 
            INNER JOIN airport arAirport ON flight.arrival_airport_id = arAirport.airport_id

            WHERE payment.ticket_no = ${t.ticket_no} AND payment.ssn = '${t.ssn}';`
        );
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    console.log(q.rows);
    // send stuff back to frontend
    res.json(q.rows);
    //res.sendStatus(200);
    console.log("Got Ticket Details");
    return; 
});


app.post('/cancelticket', async function (req, res) {
    console.log('Got cancelTicket body:', req.body);
    let t = req.body; 
    let q, c

    let seatsLeftDict = {
        economy: "economy_seat_left",
        business: "business_seat_left",
        first: "first_class_seat_left"
    }
    //console.log(seatsLeftDict[t.classType])

    try {
        c = await pool.query (
            `SELECT *
            FROM PAYMENT
            WHERE ticket_no = ${t.ticket_no} AND is_cancelled = FALSE;`
        )
        
    } catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }

    if(c.rowCount === 0) {
        res.json("Ticket already cancelled")
        return
    } else {
        try {
            q = await pool.query (
                `BEGIN TRANSACTION;  

                UPDATE payment 
                SET is_cancelled = true
                WHERE ticket_no = ${t.ticket_no};
                
                UPDATE flight
                SET ${seatsLeftDict[t.classType]} = ${seatsLeftDict[t.classType]} + 1
                WHERE flight_id = (SELECT flight_id FROM boarding_pass WHERE ticket_no = ${t.ticket_no});
                
                
                END TRANSACTION;`
            );
        }
        catch(err) {
            console.log(err.message);
            res.json(err.message)
            return;
        }
        //console.log();
        // send stuff back to frontend
        res.json("Successfully Cancelled Ticket");
        console.log("Cancelled Ticket");
        return;
    }
    return; 
});

app.post('/getClassType', async function (req, res) {
    console.log('Got classType body:', req.body);
    let t = req.body; 
    let q
    try {
        q = await pool.query (
            `SELECT class_type
            FROM boarding_pass
            WHERE ticket_no = ${t.ticket_no};`
        );
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    console.log(q.rows);
    // send stuff back to frontend
    res.json(q.rows);
    console.log("Checked Class Type");
    return; 
});

var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});
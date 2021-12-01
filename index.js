const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./creds');
var fs = require('fs');
app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());   
app.use(express.static(__dirname));
 
//async function getTable(table_name){
app.get('/select/:table_name', async function (req, res) {
    try{
        const {table_name} = req.params;
        const table = await pool.query(`Select * From ${table_name}`);
        //dumping to query.sql
        fs.appendFile("query.sql",`Select * From ${table_name}\n\n`, function(err){
            if (err) throw err;
        });
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
        //dumping to query.sql
        fs.appendFile("query.sql",`Select * From ${customers}\n\n`, function(err){
            if (err) throw err;
        });
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
        //dumping to transaction.sql
        fs.appendFile("transaction.sql",`BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('${c.ssn}', '${c.first_name}', '${c.last_name}', '${c.email}', '${c.phone_num}');
        END;\n\n`, function(err){
            if (err) throw err;
        });
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
        //dumping to query.sql
        fs.appendFile("query.sql",
        `SELECT * FROM flight WHERE 
        departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${f.departureAirport}')
        AND 
        arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${f.arrivalAirport}');\n\n`, 
        function(err){
            if (err) throw err;
        });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
    }
    console.log(q.rows + "hello");
    //var r = JSON.stringify(q.rows)

    // send stuff back to frontend
    res.json(q.rows);
    //res.sendStatus(200);
    console.log("Returned flight(s) from database");
    return; 
});

app.post('/searchConnectedFlight', async function (req, res) {
    console.log('Got searchConnectedFlight body:', req.body);
    let f = req.body; 
    let q
    try {
        q = await pool.query(
            `SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first
            FROM flight AS t1
            INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id
            WHERE t1.departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = '${f.departureAirport}')
            AND
            t2.arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = '${f.arrivalAirport}')
            AND 
            t1.sch_arrival_time < t2.sch_departure_time;
            `
        );
        console.log(q);
        
        fs.appendFile("query.sql",
        `SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first
        FROM flight AS t1
        INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id
        WHERE t1.departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = '${f.departureAirport}')
        AND
        t2.arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = '${f.arrivalAirport}')
        AND 
        t1.sch_arrival_time < t2.sch_departure_time;`,function(err){
            if (err) throw err;
            //console.log('Saved!');
        });
        
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
    }
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
    let t = req.body
    let seatsLeftDict = {
        economy: "economy_seat_left",
        business: "business_seat_left",
        first: "first_class_seat_left"
    }

    let query = `
    BEGIN TRANSACTION; 
    CREATE TEMP TABLE boughtTicks(
        ticketNo INT, 
        finalPrice FLOAT,
        ssn VARCHAR(50),
        flightID VARCHAR(50),
        flightID2 VARCHAR(50)
    );\n`
    for(i = 0; i < t.length; i++) {
        query = query + 
        `WITH ins${i} AS (
        INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags, is_waitlisted)
        VALUES (${t[i].flightID}, ${t[i].flightID2}, '${t[i].classType}', ${t[i].numBags}, 'FALSE')
        RETURNING ticket_no)
    
        INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
        VALUES ((SELECT ticket_no FROM ins${i}), '${t[i].ssn}', '${t[i].creditCardNum}', 'NA', '${t[i].discountCode}', ${t[i].totalCost}, FALSE);

        INSERT INTO boughtTicks(ticketNo, finalPrice, ssn, flightID, flightID2)
        values ((SELECT ticket_no FROM payment ORDER BY ticket_no DESC limit 1), ${t[i].totalCost}, ${t[i].ssn}, ${t[i].flightID}, ${t[i].flightID2});

        UPDATE flight
        SET ${seatsLeftDict[t[i].classType]}  = (SELECT  ${seatsLeftDict[t[i].classType]} FROM flight WHERE flight_id = ${t[i].flightID}) - 1
        WHERE flight_id = ${t[i].flightID};

        UPDATE flight
        SET ${seatsLeftDict[t[i].classType]} = 
		  	CASE ${t[i].flightID2} 
				WHEN -1 THEN 0 
				ELSE (SELECT ${seatsLeftDict[t[i].classType]} FROM flight where flight_id = ${t[i].flightID2}) - 1
			END
		WHERE flight_id = ${t[i].flightID2};\n`
    }
    query = query + `END TRANSACTION;`
    console.log(query)
    try {
        q = await pool.query(`${query}`);
        fs.appendFile("transaction.sql",`${query}\n\n`, function(err){
            if (err) throw err;
        });
    }
    catch(err) {
        console.log(err.message);
        if(err.message === `new row for relation "flight" violates check constraint "first_class_seat_left_nonnegative"`
            || err.message === `new row for relation "flight" violates check constraint "business_seat_left_nonnegative"`
            || err.message === `new row for relation "flight" violates check constraint "economy_seat_left_nonnegative"`) {
            res.json('Error: not enough seats left')
            return
        }
        res.json("Error: Could not add valid ticket(s) to the database")
        return
    }
    let g = await pool.query(
        `SELECT * FROM boughtTicks;`
    )
    console.log(g.rows)
    console.log("Added valid ticket(s) to the database");
    res.json(g.rows);
    return
});

app.post('/ticketBasePrice', async function (req, res) {
    console.log('Got ticketBasePrice body:', req.body);
    let f = req.body; 
    let q, p

    try {
        q = await pool.query (
            `SELECT base_ticket_cost 
            FROM flight
            WHERE flight_id = ${f.flightID};`
        );
        p = await pool.query (
            `SELECT base_ticket_cost 
            FROM flight
            WHERE flight_id = ${f.flightID2};`
        );
        fs.appendFile("query.sql",
        `SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = ${f.flightID};\n\n`, 
        function(err){
            if (err) throw err;
        });

        fs.appendFile("query.sql",
        `SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = ${f.flightID2};\n\n`, 
        function(err){
            if (err) throw err;
        });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return; 
    }
    let basePrice = q.rows[0].base_ticket_cost + p.rows[0].base_ticket_cost;
    console.log(basePrice);
    console.log(q.rows[0].base_ticket_cost)

    // send stuff back to frontend
    res.json(basePrice);
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
        fs.appendFile("query.sql",
        `SELECT discount_amount, discount_type 
        FROM discount
        WHERE discount_code = '${d.discountCode}';\n\n`, 
        function(err){
            if (err) throw err;
        });
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
        fs.appendFile("query.sql",
        `SELECT ssn 
        FROM customer
        WHERE ssn = '${c.ssn}';\n\n`, 
        function(err){
            if (err) throw err;
        });
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
        fs.appendFile("query.sql",
        `SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = ${t.ticket_no} AND ssn = '${t.ssn}';\n\n`, 
        function(err){
            if (err) throw err;
        });
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
            boarding_pass.ticket_no, boarding_pass.flight_id, boarding_pass.flight_id_2, boarding_pass.class_type, boarding_pass.num_bags, waitlist.position, boarding_pass.is_waitlisted,

            payment.final_price, payment.is_cancelled, 

            f1.departure_airport_id AS f1_departure_airport_id, f1.arrival_airport_id AS f1_arrival_airport_id, 
            f2.departure_airport_id AS f2_departure_airport_id, f2.arrival_airport_id AS f2_arrival_airport_id, 

            f1.sch_departure_time AS f1_sch_departure_time, f1.sch_arrival_time AS f1_sch_arrival_time, 
            f1.status AS f1_status, f1.departure_gate_code AS f1_departure_gate_code, f1.arrival_gate_code AS f1_arrival_gate_code,
            f2.departure_airport_id AS f2_departure_airport_id, f2.arrival_airport_id AS f2_arrival_airport_id, 

            f2.sch_departure_time AS f2_sch_departure_time, f2.sch_arrival_time AS f2_sch_arrival_time, 
            f2.status AS f2_status, f2.departure_gate_code AS f2_departure_gate_code, f2.arrival_gate_code AS f2_arrival_gate_code,
            
            depAirport.airport_name AS f1_dep_airport_name, depAirport.airport_city AS f1_dep_airport_city_name, 
			arAirport.airport_name AS f1_arr_airport_name, arAirport.airport_city AS f1_arr_airport_city_name,
            arFinalAirport.airport_name AS f2_arr_airport_name, arFinalAirport.airport_city AS f2_arr_airport_ciy_name

            FROM boarding_pass

            INNER JOIN payment ON boarding_pass.ticket_no = payment.ticket_no
            INNER JOIN flight f1 ON boarding_pass.flight_id = f1.flight_id
            INNER JOIN flight f2 ON boarding_pass.flight_id_2 = f2.flight_id
            INNER JOIN airport depAirport ON f1.departure_airport_id = depAirport.airport_id 
            INNER JOIN airport arAirport ON f1.arrival_airport_id = arAirport.airport_id
            INNER JOIN airport arFinalAirport ON f2.arrival_airport_id = arFinalAirport.airport_id
            LEFT JOIN waitlist ON boarding_pass.ticket_no = waitlist.waitlist_id

            WHERE payment.ticket_no = ${t.ticket_no} AND payment.ssn = '${t.ssn}';`
        );
        fs.appendFile("query.sql",
        `SELECT
        boarding_pass.ticket_no, boarding_pass.flight_id, boarding_pass.flight_id_2, boarding_pass.class_type, boarding_pass.num_bags, waitlist.position, boarding_pass.is_waitlisted,

        payment.final_price, payment.is_cancelled, 

        f1.departure_airport_id AS f1_departure_airport_id, f1.arrival_airport_id AS f1_arrival_airport_id, 
        f2.departure_airport_id AS f2_departure_airport_id, f2.arrival_airport_id AS f2_arrival_airport_id, 

        f1.sch_departure_time AS f1_sch_departure_time, f1.sch_arrival_time AS f1_sch_arrival_time, 
        f1.status AS f1_status, f1.departure_gate_code AS f1_departure_gate_code, f1.arrival_gate_code AS f1_arrival_gate_code,
        f2.departure_airport_id AS f2_departure_airport_id, f2.arrival_airport_id AS f2_arrival_airport_id, 

        f2.sch_departure_time AS f2_sch_departure_time, f2.sch_arrival_time AS f2_sch_arrival_time, 
        f2.status AS f2_status, f2.departure_gate_code AS f2_departure_gate_code, f2.arrival_gate_code AS f2_arrival_gate_code,
        
        depAirport.airport_name AS f1_dep_airport_name, depAirport.airport_city AS f1_dep_airport_city_name, 
        arAirport.airport_name AS f1_arr_airport_name, arAirport.airport_city AS f1_arr_airport_city_name,
        arFinalAirport.airport_name AS f2_arr_airport_name, arFinalAirport.airport_city AS f2_arr_airport_ciy_name

        FROM boarding_pass

        INNER JOIN payment ON boarding_pass.ticket_no = payment.ticket_no
        INNER JOIN flight f1 ON boarding_pass.flight_id = f1.flight_id
        INNER JOIN flight f2 ON boarding_pass.flight_id_2 = f2.flight_id
        INNER JOIN airport depAirport ON f1.departure_airport_id = depAirport.airport_id 
        INNER JOIN airport arAirport ON f1.arrival_airport_id = arAirport.airport_id
        INNER JOIN airport arFinalAirport ON f2.arrival_airport_id = arFinalAirport.airport_id
        LEFT JOIN waitlist ON boarding_pass.ticket_no = waitlist.waitlist_id

        WHERE payment.ticket_no = ${t.ticket_no} AND payment.ssn = '${t.ssn}';\n\n`, 
        function(err){
            if (err) throw err;
        });
        
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
    let q, c, r, s, w

    let seatsLeftDict = {
        economy: "economy_seat_left",
        business: "business_seat_left",
        first: "first_class_seat_left"
    }
    //console.log(seatsLeftDict[t.classType])

    // checks to see if the ticket was already cancelled 
    try {
        c = await pool.query (
            `SELECT *
            FROM PAYMENT
            WHERE ticket_no = ${t.ticket_no} AND is_cancelled = FALSE;`
        )
        fs.appendFile("query.sql",
        `SELECT *
        FROM PAYMENT
        WHERE ticket_no = ${t.ticket_no} AND is_cancelled = FALSE;\n\n`, 
        function(err){
            if (err) throw err;
        });
        
    } catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    // ticket was already cancelled, so exit 
    if(c.rowCount === 0) {
        res.json("Ticket already cancelled")
        return
    // ticket was not cancelled yet
    } else {
        try {
            // gets boarding_pass information of the ticket to be cancelled
            r = await pool.query(
                `SELECT * FROM boarding_pass WHERE ticket_no = ${t.ticket_no};`
            );
            // checks if there is anyone on the waitlist of the flight(s) and class of the person cancelling their ticket
            s = await pool.query(
                `SELECT * 
                FROM waitlist AS w
                INNER JOIN boarding_pass AS b ON waitlist_id = ticket_no
                WHERE w.flight_id = ${r.rows[0].flight_id} AND w.flight_id_2 = ${r.rows[0].flight_id_2} 
                AND w.is_waitlisted = 'TRUE' AND b.class_type = '${r.rows[0].class_type}';`
            );
            console.log(s.rowCount)
            // nobody was on the waitlist, so just cancel the ticket
            if(s.rowCount === 0) {
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
            // someone was on the waitlist, so cancel the ticket, and move the first person on the waitlist onto the flight
            } else {
                w = await pool.query(
                    `BEGIN TRANSACTION;
                    
                    UPDATE payment 
                    SET is_cancelled = TRUE
                    WHERE ticket_no = ${t.ticket_no};

                    UPDATE boarding_pass
                    SET is_waitlisted = FALSE
                    WHERE ticket_no = (
                        SELECT waitlist_id FROM (
                            SELECT *
                            FROM waitlist AS w
                            INNER JOIN boarding_pass AS b ON waitlist_id = ticket_no
                            WHERE w.flight_id = ${r.rows[0].flight_id} AND w.flight_id_2 = ${r.rows[0].flight_id_2}
                            AND w.is_waitlisted = 'TRUE' AND b.class_type = '${t.classType}') AS activeWaitlist
                        ORDER BY activeWaitlist.position ASC limit 1);

                    UPDATE waitlist 
                    SET is_waitlisted = FALSE 
                    WHERE waitlist_id = (                      
                        SELECT waitlist_id FROM (
                            SELECT *
                            FROM waitlist AS w
                            INNER JOIN boarding_pass AS b ON waitlist_id = ticket_no
                            WHERE w.flight_id = ${r.rows[0].flight_id} AND w.flight_id_2 = ${r.rows[0].flight_id_2}
                            AND w.is_waitlisted = 'TRUE' AND b.class_type = '${t.classType}') AS activeWaitlist
                        ORDER BY activeWaitlist.position ASC limit 1);

                    END TRANSACTION;`
                )
            }
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
        return
    }

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
        fs.appendFile("query.sql",
            `SELECT class_type
            FROM boarding_pass
            WHERE ticket_no = ${t.ticket_no};\n\n`, 
            function(err){
                if (err) throw err;
            });
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
app.post('/doesFlightIdExist', async function (req, res) {
    console.log('Got doesFlightIdExist body:', req.body);
    let f = req.body; 
    let q

    try {
        q = await pool.query (
            `SELECT *
            FROM flight
            WHERE flight_id = '${f.flightID}';`
        );
        fs.appendFile("query.sql",
            `SELECT *
            FROM flight
            WHERE flight_id = '${f.flightID}';\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    if (q.rowCount === 0) {
        res.json(false)
        return 
    } else {
        res.json(true)
        return
    }
});
app.post('/doesFlightId2Exist', async function (req, res) {
    console.log('Got doesFlightId2Exist body:', req.body);
    let f = req.body; 
    let q
    if(f.flightID2 === -1) {
        res.json(true)
        return
    }
    try {
        q = await pool.query (
            `SELECT *
            FROM flight
            WHERE flight_id = '${f.flightID2}';`
        );
        fs.appendFile("query.sql",
            `SELECT *
            FROM flight
            WHERE flight_id = '${f.flightID2}';\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    if (q.rowCount === 0) {
        res.json(false)
        return 
    } else {
        res.json(true)
        return
    }
});

app.post('/howManySeatsLeft', async function (req, res) {
    console.log('Got howManySeatsLeft body:', req.body);
    let s = req.body; 
    let q

    let seatsLeftDict = {
        economy: "economy_seat_left",
        business: "business_seat_left",
        first: "first_class_seat_left"
    }

    try {
        q = await pool.query (
            `SELECT ${seatsLeftDict[s.classType]}
            FROM flight
            WHERE flight_id = '${s.flightID}';`
        );
        fs.appendFile("query.sql",
            `SELECT ${seatsLeftDict[s.classType]}
            FROM flight
            WHERE flight_id = '${s.flightID}';\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    if (q.rowCount === 0) {
        res.json('Invalid flightID')
        return 
    } else {
        res.json(q.rows)
        return
    }
});

app.post('/doesSsnExist', async function (req, res) {
    console.log('Got doesSsnExist body:', req.body);
    let c = req.body; 
    let q

    try {
        q = await pool.query (
            `SELECT 
            FROM customer
            WHERE ssn = '${c.ssn}';`
        );
        fs.appendFile("query.sql",
            `SELECT 
            FROM customer
            WHERE ssn = '${c.ssn}';\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    if (q.rowCount === 0) {
        res.json(false)
        return 
    } else {
        res.json(true)
        return
    }
});

app.post('/saveWaitListInfo', async function (req, res) {
    console.log('Got saveWaitListInfo body:', req.body);
    let w = req.body[0]; 
    let q, r, s

    let seatsLeftDict = {
        economy: "economy_seat_left",
        business: "business_seat_left",
        first: "first_class_seat_left"
    }
    
    //check if there is no room on the given flight(s)
    // if no room, add to waitlist
    // if there is room, just add to the flight instead
    try {
        q = await pool.query (
            `SELECT f1.${seatsLeftDict[w.classType]} AS f1_seatLeft, f2.${seatsLeftDict[w.classType]} AS f2_seatLeft
            FROM flight AS f1, flight AS f2
            WHERE f1.flight_id = ${w.flightID} AND f2.flight_id = ${w.flightID2}
            GROUP BY f1_seatLeft, f2_seatLeft
            HAVING f1.${seatsLeftDict[w.classType]} > 0 AND f2.${seatsLeftDict[w.classType]} > 0;`
        );
        fs.appendFile("query.sql",
            `SELECT f1.${seatsLeftDict[w.classType]} AS f1_seatLeft, f2.${seatsLeftDict[w.classType]} AS f2_seatLeft
            FROM flight AS f1, flight AS f2
            WHERE f1.flight_id = ${w.flightID} AND f2.flight_id = ${w.flightID2}
            GROUP BY f1_seatLeft, f2_seatLeft
            HAVING f1.${seatsLeftDict[w.classType]} > 0 AND f2.${seatsLeftDict[w.classType]} > 0;\n\n`, 
            function(err){
                if (err) throw err;
            });
    } catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    if (q.rowCount === 0) {
        try {
            r = await pool.query (
                `BEGIN TRANSACTION; 
                CREATE TEMP TABLE waitlistInfo(
                    waitlist_id INT,
                    ssn VARCHAR(50),
                    flightID VARCHAR(50),
                    flightID2 VARCHAR(50),
                    position INT
                );
                
                WITH ins0 AS (
                INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags, is_waitlisted)
                VALUES (${w.flightID}, ${w.flightID2}, '${w.classType}', ${w.numBags}, 'TRUE')
                RETURNING ticket_no)
            
                INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
                VALUES ((SELECT ticket_no FROM ins0), '${w.ssn}', '${w.creditCardNum}', 'NA', '${w.discountCode}', ${w.totalCost}, FALSE);
    
                INSERT INTO waitlist (waitlist_id, ssn, flight_id, flight_id_2, is_waitlisted)
                VALUES ((SELECT ticket_no FROM payment ORDER BY payment DESC limit 1), ${w.ssn}, ${w.flightID}, ${w.flightID2}, 'TRUE');
        
                INSERT INTO waitlistInfo(waitlist_id, ssn, flightID, flightID2, position)
                values ((SELECT waitlist_id FROM waitlist ORDER BY waitlist_id DESC limit 1), ${w.ssn}, ${w.flightID}, ${w.flightID2}, (SELECT position FROM waitlist ORDER BY waitlist_id DESC limit 1));
                    
                END TRANSACTION;
            `)
            fs.appendFile("transaction.sql",
            `BEGIN TRANSACTION; 
            CREATE TEMP TABLE waitlistInfo(
                waitlist_id INT,
                ssn VARCHAR(50),
                flightID VARCHAR(50),
                flightID2 VARCHAR(50),
                position INT
            );
            
            WITH ins0 AS (
            INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags, is_waitlisted)
            VALUES (${w.flightID}, ${w.flightID2}, '${w.classType}', ${w.numBags}, 'TRUE')
            RETURNING ticket_no)
        
            INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
            VALUES ((SELECT ticket_no FROM ins0), '${w.ssn}', '${w.creditCardNum}', 'NA', '${w.discountCode}', ${w.totalCost}, FALSE);

            INSERT INTO waitlist (waitlist_id, ssn, flight_id, flight_id_2, is_waitlisted)
            VALUES ((SELECT ticket_no FROM payment ORDER BY payment DESC limit 1), ${w.ssn}, ${w.flightID}, ${w.flightID2}, 'TRUE');
    
            INSERT INTO waitlistInfo(waitlist_id, ssn, flightID, flightID2, position)
            values ((SELECT waitlist_id FROM waitlist ORDER BY waitlist_id DESC limit 1), ${w.ssn}, ${w.flightID}, ${w.flightID2}, (SELECT position FROM waitlist ORDER BY waitlist_id DESC limit 1));
                
            END TRANSACTION;\n\n`, 
            function(err){
                if (err) throw err;
            });
        } catch(err) {
            console.log(err.message);
            res.json("Error adding to waitlist")
            return;
        }
        
        s = await pool.query (`SELECT * FROM waitlistInfo;`)
        console.log(s.rows)
        res.json(s.rows)
        let t = await pool.query(`DROP TABLE waitlistinfo;`)
        return

    } else {
        res.json("There are seats left on this flight.")
        return;
    }
});

app.post('/getWaitListPosition', async function (req, res) {
    console.log('Got getWaitListPosition body:', req.body);
    let p = req.body[0]; 
    let q

    try {
        q = await pool.query (
            `SELECT position
            FROM waitlist
            WHERE position <= ${p.position} AND is_waitlisted = 'TRUE'
            ORDER BY position ASC;`
        );
        fs.appendFile("query.sql",
            `SELECT position
            FROM waitlist
            WHERE position <= ${p.position} AND is_waitlisted = 'TRUE'
            ORDER BY position ASC;\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    res.json(q.rowCount)
    return 
 
});

app.post('/doesDiscountCodeExist', async function (req, res) {
    console.log('Got doesDiscountCodeExist body:', req.body);
    let d = req.body; 
    let q

    try {
        q = await pool.query (
            `SELECT discount_code
            FROM discount
            WHERE discount_code = '${d.discountCode}';`
        );
        fs.appendFile("query.sql",
            `SELECT discount_code
            FROM discount
            WHERE discount_code = '${d.discountCode}';\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    if (q.rowCount === 0) {
        res.json(false)
        return  
    } else {
        res.json(true)
        return 
    }
});

app.post('/doesConnectingFlightExist', async function (req, res) {
    console.log('Got doesConnectingFlightExist body:', req.body);
    let f = req.body; 
    let q, r, s

    try {
        r = await pool.query (
            `SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = ${f.flightID})`
        )
        fs.appendFile("query.sql",
            `SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = ${f.flightID})\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    try {
        s = await pool.query (
            `SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT arrival_airport_id FROM flight WHERE flight_id = ${f.flightID2});`
        )
        fs.appendFile("query.sql",
            `SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = ${f.flightID2});\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }

    try {
        q = await pool.query (
            `SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first

            FROM flight AS t1

            INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id

            WHERE t1.departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${r.rows[0].airport_city}')
            AND
            t2.arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${s.rows[0].airport_city}')
            AND 
            t1.sch_arrival_time < t2.sch_departure_time
            AND t1.flight_id = ${f.flightID} AND t2.flight_id = ${f.flightID2};`
        );
        fs.appendFile("query.sql",
            `SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first

            FROM flight AS t1

            INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id

            WHERE t1.departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${r.rows[0].airport_city}')
            AND
            t2.arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = '${s.rows[0].airport_city}')
            AND 
            t1.sch_arrival_time < t2.sch_departure_time
            AND t1.flight_id = ${f.flightID} AND t2.flight_id = ${f.flightID2};\n\n`, 
            function(err){
                if (err) throw err;
            });
    }
    catch(err) {
        console.log(err.message);
        res.json(err.message)
        return;
    }
    console.log(q.rows)
    if (q.rowCount === 0) {
        res.json(false)
        return  
    } else {
        res.json(true)
        return 
    }
});

app.post('/getWaitlistPositionQaulifier', async function (req, res) {
    
    let v = req.body; 
    let q;
    console.log("ticket_no:"+v[0].ticket_no);
    try {
        q = await pool.query (
            `SELECT position
            FROM waitlist
            WHERE waitlist_id = '${ticket_no}';`
        );
        fs.appendFile("query.sql",
            `SELECT position
            FROM waitlist
            WHERE waitlist_id = '${ticket_no}';\n\n`, 
            function(err){
                if (err) throw err;
            });
            res.json(q);
    }
    catch(err) {
        console.log("hello");
        console.log(err.message);
        res.json(err.message)
        return;
    }
   return;
});

var server = app.listen(5000, function () {
    console.log('Server is listening at port 5000...');
});
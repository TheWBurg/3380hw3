/*
The following are SQL statements that our program runs
*/

--Queries--
SELECT * FROM flight WHERE 
        departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Houston')
        AND 
        arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Dallas');

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first
        FROM flight AS t1
        INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id
        WHERE t1.departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Houston')
        AND
        t2.arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Dallas')
        AND 
        t1.sch_arrival_time < t2.sch_departure_time;SELECT ssn 
        FROM customer
        WHERE ssn = 'Paule';

SELECT * FROM flight WHERE 
        departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
        AND 
        arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Houston');

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first
        FROM flight AS t1
        INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id
        WHERE t1.departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
        AND
        t2.arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Houston')
        AND 
        t1.sch_arrival_time < t2.sch_departure_time;SELECT 
            FROM customer
            WHERE ssn = 'Paule';

SELECT *
            FROM flight
            WHERE flight_id = '4';

SELECT *
            FROM flight
            WHERE flight_id = '5';

SELECT discount_code
            FROM discount
            WHERE discount_code = '10PCTOFF';

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 4)

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 5);

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first

            FROM flight AS t1

            INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id

            WHERE t1.departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
            AND
            t2.arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Houston')
            AND 
            t1.sch_arrival_time < t2.sch_departure_time
            AND t1.flight_id = 4 AND t2.flight_id = 5;

SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = 5;

SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = 4;

SELECT discount_amount, discount_type 
        FROM discount
        WHERE discount_code = '10PCTOFF';

SELECT ssn 
        FROM customer
        WHERE ssn = 'Will';

SELECT 
            FROM customer
            WHERE ssn = 'Will';

SELECT *
            FROM flight
            WHERE flight_id = '4';

SELECT *
            FROM flight
            WHERE flight_id = '5';

SELECT discount_code
            FROM discount
            WHERE discount_code = '10PCTOFF';

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 4)

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 5);

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first

            FROM flight AS t1

            INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id

            WHERE t1.departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
            AND
            t2.arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Houston')
            AND 
            t1.sch_arrival_time < t2.sch_departure_time
            AND t1.flight_id = 4 AND t2.flight_id = 5;

SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = 4;

SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = 5;

SELECT discount_amount, discount_type 
        FROM discount
        WHERE discount_code = '10PCTOFF';

SELECT 
            FROM customer
            WHERE ssn = 'Will';

SELECT *
            FROM flight
            WHERE flight_id = '4';

SELECT *
            FROM flight
            WHERE flight_id = '5';

SELECT discount_code
            FROM discount
            WHERE discount_code = 'NA';

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 4)

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 5);

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first

            FROM flight AS t1

            INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id

            WHERE t1.departure_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
            AND
            t2.arrival_airport_id IN (SELECT airport_id FROM airport WHERE airport_city = 'Houston')
            AND 
            t1.sch_arrival_time < t2.sch_departure_time
            AND t1.flight_id = 4 AND t2.flight_id = 5;

SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = 4;

SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = 5;

SELECT discount_amount, discount_type 
        FROM discount
        WHERE discount_code = 'NA';

SELECT f1.business_seat_left AS f1_seatLeft, f2.business_seat_left AS f2_seatLeft
            FROM flight AS f1, flight AS f2
            WHERE f1.flight_id = 4 AND f2.flight_id = 5
            GROUP BY f1_seatLeft, f2_seatLeft
            HAVING f1.business_seat_left > 0 AND f2.business_seat_left > 0;

SELECT position
            FROM waitlist
            WHERE position <= 1 AND is_waitlisted = 'TRUE'
            AND flight_id = 4 AND flight_id_2 = 5
            ORDER BY position ASC;

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 18 AND ssn = 'Paule';

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 1 AND ssn = 'Paule';

SELECT
        boarding_pass.ticket_no, boarding_pass.flight_id, boarding_pass.flight_id_2, boarding_pass.class_type, boarding_pass.num_bags, waitlist.position, waitlist.is_waitlisted,

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

        WHERE payment.ticket_no = 1 AND payment.ssn = 'Paule';

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 1 AND ssn = 'Will';

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 2 AND ssn = 'Will';

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 3 AND ssn = 'Will';

SELECT
        boarding_pass.ticket_no, boarding_pass.flight_id, boarding_pass.flight_id_2, boarding_pass.class_type, boarding_pass.num_bags, waitlist.position, waitlist.is_waitlisted,

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

        WHERE payment.ticket_no = 3 AND payment.ssn = 'Will';

SELECT position
            FROM waitlist
            WHERE position <= 1 AND is_waitlisted = 'TRUE'
            AND flight_id = 4 AND flight_id_2 = 5
            ORDER BY position ASC;

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 1 AND ssn = 'Paule';

SELECT class_type
            FROM boarding_pass
            WHERE ticket_no = 1;

SELECT *
        FROM PAYMENT
        WHERE ticket_no = 1 AND is_cancelled = FALSE;

SELECT * FROM boarding_pass WHERE ticket_no = 1;

SELECT * 
            FROM waitlist AS w
            INNER JOIN boarding_pass AS b ON waitlist_id = ticket_no
            WHERE w.flight_id = 4 AND w.flight_id_2 = 5 
            AND w.is_waitlisted = 'TRUE' AND b.class_type = 'business';


SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 3 AND ssn = 'Will';

SELECT
        boarding_pass.ticket_no, boarding_pass.flight_id, boarding_pass.flight_id_2, boarding_pass.class_type, boarding_pass.num_bags, waitlist.position, waitlist.is_waitlisted,

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

        WHERE payment.ticket_no = 3 AND payment.ssn = 'Will';




        --Transactions--
        BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('Paule', 'Paul', 'Edson', 'pauledson98@yahoo.com', '2816696452');
        END;


    BEGIN TRANSACTION; 
    CREATE TEMP TABLE boughtTicks(
        ticketNo INT, 
        finalPrice FLOAT,
        ssn VARCHAR(50),
        flightID VARCHAR(50),
        flightID2 VARCHAR(50)
    );
WITH ins0 AS (
        INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags)
        VALUES (4, 5, 'business', 1)
        RETURNING ticket_no)
    
        INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
        VALUES ((SELECT ticket_no FROM ins0), 'Paule', '123', 'NA', '10PCTOFF', 810, FALSE);

        INSERT INTO boughtTicks(ticketNo, finalPrice, ssn, flightID, flightID2)
        values ((SELECT ticket_no FROM payment ORDER BY ticket_no DESC limit 1), 810, 'Paule', 4, 5);

        UPDATE flight
        SET business_seat_left  = (SELECT  business_seat_left FROM flight WHERE flight_id = 4) - 1
        WHERE flight_id = 4;

        UPDATE flight
        SET business_seat_left = 
		  	CASE 5 
				WHEN -1 THEN 0 
				ELSE (SELECT business_seat_left FROM flight where flight_id = 5) - 1
			END
		WHERE flight_id = 5;
END TRANSACTION;

BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('Will', 'Will', 'Burq', 'williamberquist@gmail.com', 'NA');
        END;

BEGIN TRANSACTION; 
            CREATE TEMP TABLE waitlistInfo(
                waitlist_id INT,
                ssn VARCHAR(50),
                flightID VARCHAR(50),
                flightID2 VARCHAR(50),
                position INT
            );
            
            WITH ins0 AS (
            INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags)
            VALUES (4, 5, 'business', 1, 'TRUE')
            RETURNING ticket_no)
        
            INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
            VALUES ((SELECT ticket_no FROM ins0), 'Will', '1234', 'NA', 'NA', 900, FALSE);

            INSERT INTO waitlist (waitlist_id, ssn, flight_id, flight_id_2, is_waitlisted)
            VALUES ((SELECT ticket_no FROM payment ORDER BY payment DESC limit 1), Will, 4, 5, 'TRUE');
    
            INSERT INTO waitlistInfo(waitlist_id, ssn, flightID, flightID2, position)
            values ((SELECT waitlist_id FROM waitlist ORDER BY waitlist_id DESC limit 1), Will, 4, 5, (SELECT position FROM waitlist ORDER BY waitlist_id DESC limit 1));
                
            END TRANSACTION;

BEGIN TRANSACTION;
                    
                UPDATE payment 
                SET is_cancelled = TRUE
                WHERE ticket_no = 1;

                UPDATE waitlist 
                SET is_waitlisted = FALSE 
                WHERE waitlist_id = (                      
                    SELECT waitlist_id FROM (
                        SELECT *
                        FROM waitlist AS w
                        INNER JOIN boarding_pass AS b ON waitlist_id = ticket_no
                        WHERE w.flight_id = 4 AND w.flight_id_2 = 5
                        AND w.is_waitlisted = 'TRUE' AND b.class_type = 'business') AS activeWaitlist
                    ORDER BY activeWaitlist.position ASC limit 1);

                END TRANSACTION;

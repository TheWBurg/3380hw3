helloSELECT ssn 
        FROM customer
        WHERE ssn = '165-547-4998489';

SELECT * FROM flight WHERE 
        departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
        AND 
        arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Houston');

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first
        FROM flight AS t1
        INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id
        WHERE t1.departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
        AND
        t2.arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Houston')
        AND 
        t1.sch_arrival_time < t2.sch_departure_time;SELECT * FROM flight WHERE 
        departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
        AND 
        arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Dallas');

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first
        FROM flight AS t1
        INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id
        WHERE t1.departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
        AND
        t2.arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Dallas')
        AND 
        t1.sch_arrival_time < t2.sch_departure_time;SELECT 
            FROM customer
            WHERE ssn = '1';

SELECT *
            FROM flight
            WHERE flight_id = '3';

SELECT *
            FROM flight
            WHERE flight_id = '4';

SELECT discount_code
            FROM discount
            WHERE discount_code = 'NA';

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 3)

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 4)

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first

            FROM flight AS t1

            INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id

            WHERE t1.departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
            AND
            t2.arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Dallas')
            AND 
            t1.sch_arrival_time < t2.sch_departure_time
            AND t1.flight_id = 3 AND t2.flight_id = 4;

SELECT 
            FROM customer
            WHERE ssn = '1';

SELECT *
            FROM flight
            WHERE flight_id = '3';

SELECT *
            FROM flight
            WHERE flight_id = '-1';

SELECT discount_code
            FROM discount
            WHERE discount_code = 'NA';

SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = -1;

SELECT base_ticket_cost 
        FROM flight
        WHERE flight_id = 3;

SELECT discount_amount, discount_type 
        FROM discount
        WHERE discount_code = 'NA';

SELECT 
            FROM customer
            WHERE ssn = '1';

SELECT *
            FROM flight
            WHERE flight_id = '3';

SELECT *
            FROM flight
            WHERE flight_id = '-1';

SELECT discount_code
            FROM discount
            WHERE discount_code = 'NA';

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = 3)

SELECT airport_city
            FROM airport 
            WHERE airport_id = (SELECT departure_airport_id FROM flight WHERE flight_id = -1)

SELECT t1.flight_id AS flight_id1, t2.flight_id AS flight_id2, t1.departure_airport_id, t1.arrival_airport_id AS layover_airport_id, t2.arrival_airport_id AS destination_airport_id, 
            t1.sch_departure_time, t1.sch_arrival_time AS layover_arrival_time, t2.sch_departure_time AS layover_departure_time, t2.sch_arrival_time AS destination_arrival_time,
            t1.economy_seat_left AS t1_econ, t2.economy_seat_left AS t2_econ, t1.business_seat_left AS t1_bus, t2.business_seat_left AS t2_bus, t1.first_class_seat_left AS t1_first, 
            t2.first_class_seat_left AS t2_first

            FROM flight AS t1

            INNER JOIN flight AS t2 ON t2.departure_airport_id = t1.arrival_airport_id

            WHERE t1.departure_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'Denver')
            AND
            t2.arrival_airport_id = (SELECT airport_id FROM airport WHERE airport_city = 'NA')
            AND 
            t1.sch_arrival_time < t2.sch_departure_time
            AND t1.flight_id = 3 AND t2.flight_id = -1;

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 3 AND ssn = '1';

SELECT
        boarding_pass.ticket_no, boarding_pass.flight_id, boarding_pass.flight_id_2, boarding_pass.class_type, boarding_pass.num_bags, 

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

        WHERE payment.ticket_no = 3 AND payment.ssn = '1';

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 35 AND ssn = '1';

SELECT
        boarding_pass.ticket_no, boarding_pass.flight_id, boarding_pass.flight_id_2, boarding_pass.class_type, boarding_pass.num_bags, 

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

        WHERE payment.ticket_no = 35 AND payment.ssn = '1';


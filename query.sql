SELECT ssn 
        FROM customer
        WHERE ssn = '165-547-499878';

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 4 AND ssn = '1';

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

        WHERE payment.ticket_no = 4 AND payment.ssn = '1';

SELECT ticket_no, ssn
        FROM payment
        WHERE ticket_no = 4 AND ssn = '1';

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

        WHERE payment.ticket_no = 4 AND payment.ssn = '1';

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


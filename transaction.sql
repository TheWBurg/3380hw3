BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('165-547-4998489', 'Paul', 'Edson', 'pauledson98@yahoo.com', 'NA');
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
        INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags, is_waitlisted)
        VALUES (3, -1, 'economy', 1, 'FALSE')
        RETURNING ticket_no)
    
        INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, flight_id, flight_id_2, is_cancelled)
        VALUES ((SELECT ticket_no FROM ins0), '1', '456978961234', 'NA', 'NA', 150, 3, -1, FALSE);

        INSERT INTO boughtTicks(ticketNo, finalPrice, ssn, flightID, flightID2)
        values ((SELECT ticket_no FROM payment ORDER BY ticket_no DESC limit 1), 150, 1, 3, -1);

        UPDATE flight
        SET economy_seat_left  = (SELECT  economy_seat_left FROM flight WHERE flight_id = 3) - 1
        WHERE flight_id = 3;

        UPDATE flight
        SET economy_seat_left = 
		  	CASE -1 
				WHEN -1 THEN 0 
				ELSE (SELECT economy_seat_left FROM flight where flight_id = -1) - 1
			END
		WHERE flight_id = -1;
END TRANSACTION;


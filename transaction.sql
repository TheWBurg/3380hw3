BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('2', 'Paul', 'Edson', 'pauledson98@yahoo.com', 'NA');
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
        VALUES (4, 5, 'economy', 1, 'FALSE')
        RETURNING ticket_no)
    
        INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, flight_id, flight_id_2, is_cancelled)
        VALUES ((SELECT ticket_no FROM ins0), '2', '1595159515951595', 'NA', 'NA', 300, 4, 5, FALSE);

        INSERT INTO boughtTicks(ticketNo, finalPrice, ssn, flightID, flightID2)
        values ((SELECT ticket_no FROM payment ORDER BY ticket_no DESC limit 1), 300, 2, 4, 5);

        UPDATE flight
        SET economy_seat_left  = (SELECT  economy_seat_left FROM flight WHERE flight_id = 4) - 1
        WHERE flight_id = 4;

        UPDATE flight
        SET economy_seat_left = 
		  	CASE 5 
				WHEN -1 THEN 0 
				ELSE (SELECT economy_seat_left FROM flight where flight_id = 5) - 1
			END
		WHERE flight_id = 5;
END TRANSACTION;


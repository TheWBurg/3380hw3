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

BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('1', '1', '1', 'NA', 'NA');
        END;

BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('2', '1', '1', 'NA', 'NA');
        END;

BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('3', '8', 'asdf', 'NA', '1');
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
            INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags, is_waitlisted)
            VALUES (2, -1, 'first', 1, 'TRUE')
            RETURNING ticket_no)
        
            INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
            VALUES ((SELECT ticket_no FROM ins0), '2', '1', 'NA', 'NA', 1250, FALSE);

            INSERT INTO waitlist (waitlist_id, ssn, flight_id, flight_id_2, is_waitlisted)
            VALUES ((SELECT ticket_no FROM payment ORDER BY payment DESC limit 1), 2, 2, -1, 'TRUE');
    
            INSERT INTO waitlistInfo(waitlist_id, ssn, flightID, flightID2, position)
            values ((SELECT waitlist_id FROM waitlist ORDER BY waitlist_id DESC limit 1), 2, 2, -1, (SELECT position FROM waitlist ORDER BY waitlist_id DESC limit 1));
                
            END TRANSACTION;

BEGIN TRANSACTION; 
            CREATE TEMP TABLE waitlistInfo(
                waitlist_id INT,
                ssn VARCHAR(50),
                flightID VARCHAR(50),
                flightID2 VARCHAR(50),
                position INT
            );
            
            WITH ins0 AS (
            INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags, is_waitlisted)
            VALUES (2, -1, 'first', 1, 'TRUE')
            RETURNING ticket_no)
        
            INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
            VALUES ((SELECT ticket_no FROM ins0), '1', '1', 'NA', 'NA', 1250, FALSE);

            INSERT INTO waitlist (waitlist_id, ssn, flight_id, flight_id_2, is_waitlisted)
            VALUES ((SELECT ticket_no FROM payment ORDER BY payment DESC limit 1), 1, 2, -1, 'TRUE');
    
            INSERT INTO waitlistInfo(waitlist_id, ssn, flightID, flightID2, position)
            values ((SELECT waitlist_id FROM waitlist ORDER BY waitlist_id DESC limit 1), 1, 2, -1, (SELECT position FROM waitlist ORDER BY waitlist_id DESC limit 1));
                
            END TRANSACTION;

BEGIN TRANSACTION; 
            CREATE TEMP TABLE waitlistInfo(
                waitlist_id INT,
                ssn VARCHAR(50),
                flightID VARCHAR(50),
                flightID2 VARCHAR(50),
                position INT
            );
            
            WITH ins0 AS (
            INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags, is_waitlisted)
            VALUES (2, -1, 'first', 1, 'TRUE')
            RETURNING ticket_no)
        
            INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
            VALUES ((SELECT ticket_no FROM ins0), '1', '1', 'NA', 'NA', 1250, FALSE);

            INSERT INTO waitlist (waitlist_id, ssn, flight_id, flight_id_2, is_waitlisted)
            VALUES ((SELECT ticket_no FROM payment ORDER BY payment DESC limit 1), 1, 2, -1, 'TRUE');
    
            INSERT INTO waitlistInfo(waitlist_id, ssn, flightID, flightID2, position)
            values ((SELECT waitlist_id FROM waitlist ORDER BY waitlist_id DESC limit 1), 1, 2, -1, (SELECT position FROM waitlist ORDER BY waitlist_id DESC limit 1));
                
            END TRANSACTION;

BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('1', 'a', 's', 'NA', 'NA');
        END;

BEGIN;
            INSERT INTO customer (ssn, first_name, last_name, email, phone_num)
            VALUES ('5', 'qwer', 'asdf', 'NA', 'NA');
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
        VALUES (6, 7, 'economy', 1, 'FALSE')
        RETURNING ticket_no)
    
        INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
        VALUES ((SELECT ticket_no FROM ins0), '1', '1', 'NA', 'NA', 400, FALSE);

        INSERT INTO boughtTicks(ticketNo, finalPrice, ssn, flightID, flightID2)
        values ((SELECT ticket_no FROM payment ORDER BY ticket_no DESC limit 1), 400, 1, 6, 7);

        UPDATE flight
        SET economy_seat_left  = (SELECT  economy_seat_left FROM flight WHERE flight_id = 6) - 1
        WHERE flight_id = 6;

        UPDATE flight
        SET economy_seat_left = 
		  	CASE 7 
				WHEN -1 THEN 0 
				ELSE (SELECT economy_seat_left FROM flight where flight_id = 7) - 1
			END
		WHERE flight_id = 7;
END TRANSACTION;

BEGIN TRANSACTION; 
            CREATE TEMP TABLE waitlistInfo(
                waitlist_id INT,
                ssn VARCHAR(50),
                flightID VARCHAR(50),
                flightID2 VARCHAR(50),
                position INT
            );
            
            WITH ins0 AS (
            INSERT INTO boarding_pass (flight_id, flight_id_2, class_type, num_bags, is_waitlisted)
            VALUES (2, -1, 'first', 1, 'TRUE')
            RETURNING ticket_no)
        
            INSERT INTO payment (ticket_no, ssn, credit_card_num, taxes, discount_code, final_price, is_cancelled)
            VALUES ((SELECT ticket_no FROM ins0), '1', '1', 'NA', 'NA', 1250, FALSE);

            INSERT INTO waitlist (waitlist_id, ssn, flight_id, flight_id_2, is_waitlisted)
            VALUES ((SELECT ticket_no FROM payment ORDER BY payment DESC limit 1), 1, 2, -1, 'TRUE');
    
            INSERT INTO waitlistInfo(waitlist_id, ssn, flightID, flightID2, position)
            values ((SELECT waitlist_id FROM waitlist ORDER BY waitlist_id DESC limit 1), 1, 2, -1, (SELECT position FROM waitlist ORDER BY waitlist_id DESC limit 1));
                
            END TRANSACTION;


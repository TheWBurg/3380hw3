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

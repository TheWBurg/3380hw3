export class customer 
{
    constructor(ssn, first_name, last_name, email, phone_num) 
    {
        this.ssn = ssn;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email; 
        this.phone_num = phone_num;
    }
}

export class paymentDetails
{
    constructor(ticket_no, credit_card_num, taxes, discount_code, price)
    {
        this.ticket_no = ticket_no;
        this.credit_card_num = credit_card_num;
        this.taxes = taxes; 
        this.discount_code = discount_code;
        this.price = price;
    }
}

export class boardingPass
{
    constructor(ticket_no, flight_id, gate_code, class_type, num_bags)
    {
        this.ticket_no = ticket_no;
        this.flight_id = flight_id;
        this.gate_code = gate_code;
        this.class_type = class_type;
        this.num_bags = num_bags; 
    }  
}



getPurchaseInfo()
{
    var numOfTickets; 

    /* customer details */
    var ssn; 
    var first_name;
    var last_name;
    var email; 
    var phone_num;

    /* payment details */ 
    var ticket_no;
    var credit_cardd_num;
    var taxes;
    var discount_code; 
    var price; 

    /* boarding pass details */
    var flight_id; 
    var gate_code; 
    var class_type; 
    var num_bags;

}



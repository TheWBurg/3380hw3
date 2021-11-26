import { getDiscountInfo, saveCustomer, getFlightsDetails, saveTicketInfo, getTicketBasePrice, checkSSN } from "../test/databaseFunctions.js";
//import { getFlightsDetails } from "../test/databaseFunctions.js";
//import "../test/databaseFunctions.js";

// this function checks for valid fields when a customer is registered. 
// if optionnal fields are left blank, their values are updated to NA, which is what we are 
// using isntead of nulls inside the database
function validCustomerDetails(cust) {
    if (cust.ssn === '') {
        // do something to say invalid 
        return false;
    }
    if (cust.first_name === '') {
        // do something to say invalid 
        return false;
    }
    if (cust.last_name === '') {
        // do something to say invalid 
        return false;
    }
    if (cust.email === '') {
        cust.email = 'NA'
    }
    if (cust.phone_num === '') {
        cust.phone_num = 'NA'
    }
    return true; 
}

async function ssnExists(cust) {
    if (await checkSSN(cust) === 0) { // if rowCount === 0
        return false
    } else {
        return true
    }
}

let customers = []
const addCustomer = async (ev)=> {
    ev.preventDefault();  //to stop the form submitting
    let thisCustomer = {
        ssn: document.getElementById('ssn').value,
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone_num: document.getElementById('phoneNum').value
    }
    let doesSsnExist = await ssnExists(thisCustomer)
    let isValidCustDetails = validCustomerDetails(thisCustomer)
    //thisCustomer = validCustomerDetails(thisCustomer)

    if (isValidCustDetails === false) {
        document.getElementById('resgiterCustomerResults').innerText = "SSN, First Name, and Last Name fields are required. \n Please try again."
    } else if(doesSsnExist === true) {
        document.getElementById('resgiterCustomerResults').innerText = "ERROR: This SSN is already registered. Please try a different SSN"
    } else {
        let res = await saveCustomer(thisCustomer);
        document.getElementById('resgiterCustomerResults').innerText = "Successfully registered this user!"
        console.log(res);
    }

    //console.log
    customers.push(thisCustomer);
    //document.forms[0].reset(); // to clear the form for the next entries
    document.querySelector('form').reset();
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('addCustomerBtn').addEventListener('click', addCustomer);
});


const searchFlight = async(ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let flightCities = {
        departureAirport: document.getElementById('departureCity').value,
        arrivalAirport: document.getElementById('arrivalCity').value,
    }
    let res = await getFlightsDetails(flightCities);
    console.log(res);

    document.getElementById('flightFesults').innerText = JSON.stringify(res); 
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('searchFlightBtn').addEventListener('click', searchFlight);
});

function checkValidForm(field) {
    // returns true if field is not empty
    return field != ''
}

// helper funcction to put allowed missing field values into the proper form we want to insert
// into the database. 
function setProperNullValueIfNull(field) {
    if (field === '') {
        return field = 'NA'
    }
    return field
}

function calculateTotalFlightCost(baseTicketCost, discountAmount, discountType, classType) {
    let classCostMultiplier
    let totalFlightCost

    if (classType === 'Economy') {
        classCostMultiplier = 1
    } else if (classType === 'Business') {
        classCostMultiplier = 3
    } else { // else classType === 'first_class'
        classCostMultiplier = 5
    }

    if (discountType === 'NA') {
        totalFlightCost = baseTicketCost * classCostMultiplier 
        return totalFlightCost
    } else if (discountType === 'Percent') {
        totalFlightCost = baseTicketCost * classCostMultiplier * discountAmount
        return totalFlightCost
    } else { // else discountType === 'Dollar'
        totalFlightCost = baseTicketCost * classCostMultiplier - discountAmount
        return totalFlightCost
    }
}

async function getTotalTicketCost(allValidTicketsArray) {
    for(const thisTicket of allValidTicketsArray) {
        let res = await getTicketBasePrice(thisTicket)
        let ticketBasePrice = res[0].base_ticket_cost
        //console.log(ticketBasePrice)

        let discountInfo = await getDiscountInfo(thisTicket)
        let discountAmount = discountInfo[0].discount_amount
        let discountType = discountInfo[0].discount_type
        let classType = thisTicket.classType

        let totalCost = calculateTotalFlightCost(ticketBasePrice, discountAmount, discountType, classType)
        //console.log('totalCost = ' + totalCost)
        thisTicket['totalCost'] = totalCost
        //console.log(thisTicket)
    }
    return allValidTicketsArray
}


const buyTicketInfo = async(ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let ticketInfo = []
    let allValidTickets = []

    // This gets all of the values entered by the user when they buy tickets
    // it creates an array of length 5 for, as we ask for info for 5 tickets
    // if the fields are left empty, it still makes a ticket in the array for it 
    ticketInfo = document.querySelectorAll('.buyTicketInfo')

    // this loop goes through the array of tickets and creates a new array that only contains 
    // valid tickets. currently it an invalid ticket is one that is missing values from any of the fields
    // besides discount code
    // TODO: add much more error checking 
    ticketInfo.forEach(thisTicketInfo => {
        let isValidForm = true

        let ssn = thisTicketInfo.querySelectorAll('.ssn')[0].value
        isValidForm = isValidForm && checkValidForm(ssn)
        //console.log(ssn)

        let flightID = thisTicketInfo.querySelectorAll('.flight_id')[0].value
        isValidForm = isValidForm && checkValidForm(flightID)

        let classType = thisTicketInfo.querySelectorAll('.classType')[0].value
        isValidForm = isValidForm && checkValidForm(classType)
        //console.log(classType)

        let creditCardNum = thisTicketInfo.querySelectorAll('.creditCardNum')[0].value
        isValidForm = isValidForm && checkValidForm(creditCardNum)

        let discountCode = thisTicketInfo.querySelectorAll('.discountCode')[0].value
        discountCode = setProperNullValueIfNull(discountCode)

        let numBags = thisTicketInfo.querySelectorAll('.numBags')[0].value
        isValidForm = isValidForm && checkValidForm(numBags)

        if (isValidForm) {
            // creates a dictionary if the ticket info is valid and pushes it to an array of valid tickets
            const thisValidTicketInfo = {
                ssn: ssn,
                flightID: flightID,
                classType: classType,
                creditCardNum: creditCardNum,
                discountCode: discountCode,
                numBags: numBags
            }
            allValidTickets.push(thisValidTicketInfo)
        }
    }) 
    // using the valid ticket information, this queries the database for the base ticket cost,
    // discount codes, and calculates the final cost. 
    allValidTickets = await getTotalTicketCost(allValidTickets)
    let res = await saveTicketInfo(allValidTickets)
    
    //let result = await (validTicketInfo)
    //console.log(result)
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buyTicketBtn').addEventListener('click', buyTicketInfo);
});



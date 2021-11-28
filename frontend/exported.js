import { getDiscountInfo, saveCustomer, getFlightsDetails, saveTicketInfo, getTicketBasePrice, checkSSN, checkTicket, getTicketDetails, cancelThisTicket, getClassType} from "../test/databaseFunctions.js";
//import { getFlightsDetails } from "../test/databaseFunctions.js";
//import "../test/databaseFunctions.js";



function clearContent(){
    document.getElementById('buyTicketsResults').innerText = ''
    document.getElementById('buyTicketsResults0').innerText = ''
    document.getElementById('buyTicketsResults1').innerText = ''
    document.getElementById('buyTicketsResults2').innerText = ''
    document.getElementById('buyTicketsResults3').innerText = ''
    document.getElementById('buyTicketsResults4').innerText = ''
    let elements = []
    elements = document.querySelectorAll('.buyTicketInfo')
    elements.forEach(thisElement => {
        thisElement.querySelectorAll(`.error_ssn`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_flight_id`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_creditCardNum`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_numBags`)[0].innerText = ''
    })

}
// this function checks for valid fields when a customer is registered. 
// if optionnal fields are left blank, their values are updated to NA, which is what we are 
// using isntead of nulls inside the database
function isValidClassType(field) {
    if(field != 'economy' && field != 'business' && field != 'first') {
        return false
    } 
    return true
}

function validCustomerDetails(cust) {
    if (cust.ssn === '') {
        return false
    }
    if (cust.first_name === '') {
        return false
    }
    if (cust.last_name === '') {
        return false
    }
    if (cust.email === '') {
        cust.email = 'NA'
    }
    if (cust.phone_num === '') {
        cust.phone_num = 'NA'
    }
    return true; 
}

function validTicketDetails(tick) {
    if (tick.ssn === '') {
        return false
    }
    if (tick.ticket_no === '') {
        return false
    }
    return true; 
}

async function ticketExists(tick) {
    if (await checkTicket(tick) === 0) { // if rowCount === 0
        return false
    }
    return true
}

// checks to see if the ssn already exists on the database. 
async function ssnExists(cust) {
    if (await checkSSN(cust) === 0) { // if rowCount === 0
        return false
    } 
    return true
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
        document.querySelector('form').reset();
    }

    //console.log
    //customers.push(thisCustomer);
    //document.forms[0].reset(); // to clear the form for the next entries

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
    document.querySelector('form').reset();
});

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

    if (classType === 'economy') {
        classCostMultiplier = 1
    } else if (classType === 'business') {
        classCostMultiplier = 3
    } else { // else classType === 'first'
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
    //clearContent();
    let ticketInfo = []
    let allValidTickets = []

    // This gets all of the values entered by the user when they buy tickets
    // it creates an array of length 5, as we ask for info for 5 tickets
    // if the fields are left empty, it still makes a ticket in the array for it 
    ticketInfo = document.querySelectorAll('.buyTicketInfo')

    // this loop goes through the array of tickets and creates a new array that only contains 
    // valid tickets. currently an invalid ticket is one that is missing values from any of the fields
    // besides discount code
    // TODO: add much more error checking 
    ticketInfo.forEach(thisTicketInfo => {

        let ssn = thisTicketInfo.querySelectorAll('.ssn')[0].value
        // checks if ssn is empty string and assign that boolean value to a variable
        const isSsnValid = (ssn != '')

        let flightID = thisTicketInfo.querySelectorAll('.flight_id')[0].value
        const isFlightIDValid = (flightID != '')

        let classType = thisTicketInfo.querySelectorAll('.classType')[0].value.toLowerCase()

        let creditCardNum = thisTicketInfo.querySelectorAll('.creditCardNum')[0].value
        const isCreditCardNumValid = (creditCardNum != '')

        let discountCode = thisTicketInfo.querySelectorAll('.discountCode')[0].value
        discountCode = setProperNullValueIfNull(discountCode)

        let numBags = thisTicketInfo.querySelectorAll('.numBags')[0].value
        const isNumBagsValid = (numBags != '')

        // If these are not all false, then we will either have an error of a valid form 
        // If they are all false, that means the form was left blank, which is fine 
        if(![isSsnValid, isFlightIDValid, isCreditCardNumValid, isNumBagsValid].every(val => val === false)) {
            if([isSsnValid, isFlightIDValid, isCreditCardNumValid, isNumBagsValid].every(val => val === true)) {
                // This means we have a valid form
                // creates a dictionary if the ticket info is valid and pushes it to an array of valid tickets
                const thisValidTicketInfo = {
                    ssn: ssn,
                    flightID: flightID,
                    classType: classType,
                    creditCardNum: creditCardNum,
                    discountCode: discountCode,
                    numBags: numBags
                }

                //let ssnRes = await doesSsnExist(thisValidTicketInfo)
                //let flightIdRes = await doesFlightIdExist(thisValidTicketInfo)
                //let seatsLeftRes = await howManySeatsLeft(thisValidTicketInfo)

                allValidTickets.push(thisValidTicketInfo)     
            } 
            if(!isSsnValid) {
                thisTicketInfo.querySelectorAll(`.error_ssn`)[0].innerText = "SSN is required. Please fill in a value"
            }
            if(!isFlightIDValid) {
                thisTicketInfo.querySelectorAll(`.error_flight_id`)[0].innerText = "Flight ID is required. Please fill in a value"
            }
            if(!isCreditCardNumValid) {
                thisTicketInfo.querySelectorAll(`.error_creditCardNum`)[0].innerText = "Credit card number is required. Please fill in a value"
            }
            if(!isNumBagsValid) {
                thisTicketInfo.querySelectorAll(`.error_numBags`)[0].innerText = "Number of bags is required. Please fill in a value"
            }
        }
    }) 
    // using the valid ticket information, this queries the database for the base ticket cost,
    // discount codes, and calculates the final cost.
    // It then displays which tickets were sucessfully bought
    
    //console.log('length:' + allValidTickets.length)
    if(allValidTickets.length > 0) {


        allValidTickets = await getTotalTicketCost(allValidTickets)
        let saveTickRes = await saveTicketInfo(allValidTickets)
        if(saveTickRes === 'Successfully bought tickets') {
            for(let i = 0; i < allValidTickets.length; i++){
                document.getElementById(`buyTicketsResults${i}`).innerText = 
                `Successfully bought a ticket for the person with SSN: ${allValidTickets[i].ssn} on flight with flightID: ${allValidTickets[i].flightID}\n`
            }
        } else if(saveTickRes === 'Error: Could not add valid ticket(s) to the database') {
            document.getElementById(`buyTicketsResults`).innerText = 
                `Error: Could not buy tickets.\n`
        }
        console.log(res)
    } else {
        document.getElementById(`buyTicketsResults`).innerText = `Error: Please enter valid information to buy a ticket\n`
    }

    document.querySelector('form').reset();
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buyTicketBtn').addEventListener('click', clearContent);
});
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buyTicketBtn').addEventListener('click', buyTicketInfo);
});

const cancelTicket = async(ev) => {
    ev.preventDefault();  //to stop the form submitting
    let thisTicket = {
        ssn: document.getElementById('ssnForCancel').value,
        ticket_no: document.getElementById('ticketNoForCancel').value
    }

    if (validTicketDetails(thisTicket) === false) {
        document.getElementById('checkCancelResults').innerText = "SSN and Ticket Number are required. \n Please try again."
    } else if (ticketExists(thisTicket) === false) {
        document.getElementById('checkCancelResults').innerText = "A ticket with this Ticket Number and SSN does not exist. \n Please try again."
    } else {
        let thisClassType = await getClassType(thisTicket)
        //console.log("this class type: " + thisClassType[0].class_type)
        thisTicket["classType"] = thisClassType[0].class_type
        //console.log(thisTicket.classType)
        let res = await cancelThisTicket(thisTicket)
        if (res === "Ticket already cancelled") {
            document.getElementById('checkCancelResults').innerText = "This ticket has already been cancelled."
        } else if (res === "Successfully Cancelled Ticket") {
            document.getElementById('checkCancelResults').innerText = "Your ticket has been cancelled."
        } else {
            document.getElementById('checkCancelResults').innerText = "An error has occured."
        }
        document.querySelector('form').reset();
    }


}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('cancelTicketBtn').addEventListener('click', cancelTicket);
});

const checkTicketStatus = async(ev) => {
    ev.preventDefault();  //to stop the form submitting
    let thisTicket = {
        ssn: document.getElementById('ssnForStatus').value,
        ticket_no: document.getElementById('ticketNoForStatus').value
    }
    
    if (validTicketDetails(thisTicket) === false) {
        document.getElementById('checkStatusResults').innerText = "SSN and Ticket Number are required. \n Please try again."
    } else if (ticketExists(thisTicket) === false) {
        document.getElementById('checkStatusResults').innerText = "A ticket with this Ticket Number and SSN does not exist. \n Please try again."
    } else {
        let res = await getTicketDetails(thisTicket)
        document.getElementById('checkStatusResults').innerText = JSON.stringify(res); 
        document.querySelector('form').reset();
    }
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('checkStatusBtn').addEventListener('click', checkTicketStatus);
});


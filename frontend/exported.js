import { getDiscountInfo, saveCustomer, getFlightsDetails, saveTicketInfo, getTicketBasePrice } from "../test/databaseFunctions.js";
//import { getFlightsDetails } from "../test/databaseFunctions.js";
//import "../test/databaseFunctions.js";

let customers = []
const addCustomer = async (ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let thisCustomer = {
        ssn: document.getElementById('ssn').value,
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone_num: document.getElementById('phoneNum').value
    }
    // call saveCustomer
    let res = await saveCustomer(thisCustomer);
    console.log(res);
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
        console.log(ticketBasePrice)

        let discountInfo = await getDiscountInfo(thisTicket)
        let discountAmount = discountInfo[0].discount_amount
        let discountType = discountInfo[0].discount_type
        console.log(discountType)
        let classType = thisTicket.classType

        let totalCost = calculateTotalFlightCost(ticketBasePrice, discountAmount, discountType, classType)
        console.log('totalCost = ' + totalCost)
        thisTicket['totalCost'] = totalCost
        console.log(thisTicket)
    }
    return allValidTicketsArray
}


const buyTicketInfo = async(ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let ticketInfo = []
    let allValidTickets = []
    ticketInfo = document.querySelectorAll('.buyTicketInfo')
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
            // creates a dictionary if the ticket info is valid and  pushes it to an array of valid tickets
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
    allValidTickets = await getTotalTicketCost(allValidTickets)
    let res = await saveTicketInfo(allValidTickets)
    
    //let result = await (validTicketInfo)
    //console.log(result)
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buyTicketBtn').addEventListener('click', buyTicketInfo);
});



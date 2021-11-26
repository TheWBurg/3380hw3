import { getDiscountInfo, saveCustomer, getFlightsDetails, saveTicketInfo } from "../test/databaseFunctions.js";
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
        return totalFlightCost = baseTicketCost * classCostMultiplier 
    } else if (discountType === 'Percent') {
        return totalFlightCost = baseTicketCost * classCostMultiplier * discountAmount
    } else { // else discountType === 'Dollar'
        return totalFlightCost = baseTicketCost * classCostMultiplier - discountAmount
    }
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

    let res = await saveTicketInfo(allValidTickets)

    validTicketInfo.forEach(thisTicket => {
        let baseTicketCost = getTicketBasePrice(thisTicket)
        let discountInfo = getDiscountInfo(thisTicket)

        let discountAmount = discountInfo.discountAmount
        let discountType = discountInfo.discountType
        let classType = thisTicket.classType

        let totalCost = calculateTotalFlightCost(baseTicketCost, discountAmount, discountType, classType)
        thisTicket.totalCost = totalCost
    
    })

    
    //let result = await (validTicketInfo)
    //console.log(result)
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buyTicketBtn').addEventListener('click', buyTicketInfo);
});



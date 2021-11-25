import { saveCustomer } from "../test/databaseFunctions.js";
import { getFlightsDetails } from "../test/databaseFunctions.js";

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
    return field === ''
}

function setProperNullValueIfNull(field) {
    if (field === '') {
        return field = 'NA'
    }
    return field
}

const buyTicketInfo = async(ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let ticketInfo = []
    let validTicketInfo = []
    ticketInfo = document.querySelectorAll(".buyTicketInfo")
    ticketInfo.forEach(element => {
        let isValidForm = true

        let ssn = element.querySelectorAll('ssn')
        isValidForm = isValidForm && checkValidForm(ssn)

        let flightID = element.querySelectorAll('flight_id')
        isValidForm = isValidForm && checkValidForm(flightID)

        let classType = element.querySelectorAll('classType')
        isValidForm = isValidForm && checkValidForm(classType)

        let creditCardNum = element.querySelectorAll('creditCardNum')
        isValidForm = isValidForm && checkValidForm(creditCardNum)

        let discountCode = element.querySelectorAll('discountCode')
        discountCode = setProperNullValueIfNull(discountCode)

        let numBags = element.querySelectorAll('numBags')
        isValidForm = isValidForm && checkValidForm(numBags)

        if (isValidForm) {
            validTicketInfo.push(element)
        }
    }) 
    //let result = await (validTicketInfo)
    //console.log(result)
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buyTicketBtn').addEventListener('click', buyTicketInfo);
});



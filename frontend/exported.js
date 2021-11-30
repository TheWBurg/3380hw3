import {getDiscountInfo, saveCustomer, getFlightsDetails, getConnectedFlightDetails, saveTicketInfo, getTicketBasePrice, checkSSN, checkTicket, getTicketDetails, cancelThisTicket, getClassType, doesSsnExist, doesFlightIdExist, doesFlightId2Exist, saveWaitListInfo, getWaitListPosition, doesDiscountCodeExist, doesConnectingFlightExist} from "../test/databaseFunctions.js";
//import { getFlightsDetails } from "../test/databaseFunctions.js";
//import from "../test/databaseFunctions.js";



function clearContent(){
    document.getElementById('buyTicketsResultsDNEonDB').innerText = ''
    document.getElementById('buyTicketsResults').innerText = ''
    document.getElementById('buyTicketsResults0').innerText = ''
    document.getElementById('buyTicketsResults1').innerText = ''
    document.getElementById('buyTicketsResults2').innerText = ''
    document.getElementById('buyTicketsResults3').innerText = ''
    document.getElementById('buyTicketsResults4').innerText = ''
    document.getElementById('waitListResults').innerText = ''
    document.getElementById('waitListResults0').innerText = ''
    let elements = []
    elements = document.querySelectorAll('.buyTicketInfo')
    elements.forEach(thisElement => {
        thisElement.querySelectorAll(`.error_ssn`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_flight_id`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_flight_id_2`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_creditCardNum`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_numBags`)[0].innerText = ''
    })
    elements = document.querySelectorAll('.waitListInfo')
    elements.forEach(thisElement => {
        thisElement.querySelectorAll(`.error_ssn`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_flight_id`)[0].innerText = ''
        thisElement.querySelectorAll(`.error_flight_id_2`)[0].innerText = ''
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
    }else if(!(validateName(thisCustomer.first_name) && validateName(thisCustomer.last_name))){
        document.getElementById('resgiterCustomerResults').innerText = "ERROR: Name cannot have spaces or numbers"
    }else if(!(validateNumber(thisCustomer.phone_num) && validateNumber(thisCustomer.phone_num))){
        document.getElementById('resgiterCustomerResults').innerText = "ERROR: Phone number cannot have letters"
    }else {
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
    document.querySelector('form').reset();
})

function validateName(name){
    let letters = /^[A-Za-z]+$/;
    
    if (name.match(letters)){
        return true
    }
    else{
        return false
    }
}

function validateNumber(number){
    let numbers = /^[0-9]+$/;
    if (number.match(numbers)||number == "NA"){
        return true
    }
    else{
        return false
    }
}

const searchFlight = async(ev)=>{
    ev.preventDefault();  //to stop the form submitting
    let flightCities = {
        departureAirport: document.getElementById('departureCity').value,
        arrivalAirport: document.getElementById('arrivalCity').value,
    }
    //these are going directly to index.js
    //let departureAirportCodes = await fetch(`http://localhost:5000/cityToCode/${flightCities.departureAirport}`);
    //let arrivalAirportCodes = await fetch(`http://localhost:5000/cityToCode/${flightCities.arrivalAirport}`);
    
    
    //console.log(res);
    //for(let j = 0; j<departureAirportCodes.length;j++){
        try{
            let res = await getFlightsDetails(flightCities);
            //editing the table in inputForm.html
            let flightInfo = document.querySelector("#flightInfo");
            let flightInfoPush = "";
            if(res == 0){
                document.getElementById('flightResults').innerText = "no flights";
            }
            else{
                document.getElementById('flightResults').innerText = "";
            }
            for(let i=0; i<res.length; i++){
                flightInfoPush += 
                `<tr>
                <th>${res[i].flight_id}</th>
                <th>${res[i].sch_departure_time}</th>
                <th>${res[i].sch_arrival_time}</th>
                <th>${res[i].departure_airport_id}</th>
                <th>${res[i].arrival_airport_id}</th>
                <th>${res[i].economy_seat_left}</th>
                <th>${res[i].business_seat_left}</th>
                <th>${res[i].first_class_seat_left}</th>
                </tr>`;
            }   
            flightInfo.innerHTML = flightInfoPush;
        }
        catch(err){
            console.log(err.message);
        }
        try{
            let res = await getConnectedFlightDetails(flightCities);
            //editing the table in inputForm.html
            let connectedFlightInfo = document.querySelector("#connectedFlightInfo");
            let flightInfoPush = "";
            if(res.length == 0){
                document.getElementById('connectedFlightResults').innerText = "No flights";
            }
            else{
                document.getElementById('connectedFlightResults').innerText = "";
            }
            for(let i=0; i<res.length; i++){
                flightInfoPush += 
                `<tr>
                <th>${res[i].flight_id1}</th>
                <th>${res[i].flight_id2}</th>
                <th>${res[i].departure_airport_id}</th>
                <th>${res[i].layover_airport_id}</th>
                <th>${res[i].destination_airport_id}</th>
                <th>${res[i].sch_departure_time}</th>
                <th>${res[i].layover_arrival_time}</th>
                <th>${res[i].layover_departure_time}</th>
                <th>${res[i].destination_arrival_time}</th>
                <th>${res[i].t1_econ}-${res[i].t2_econ}</th>
                <th>${res[i].t1_bus}-${res[i].t2_bus}</th>
                <th>${res[i].t1_first}-${res[i].t2_first}</th>
                </tr>`;
            }   
            connectedFlightInfo.innerHTML = flightInfoPush;
        }
        catch(err){
            console.log(err.message);
        }
    //}
    
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('searchFlightBtn').addEventListener('click', searchFlight);
});

// helper funcction to put allowed missing field values into the proper form we want to insert
// into the database. 
function setProperNullValueIfNull(field) {
    if (field === '') {
        return field = 'NA'
    }
    return field
}

function setProperNullValueIfNullForFlightID2(field) {
    if (field === '') {
        return field = '-1'
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
        let ticketBasePrice = await getTicketBasePrice(thisTicket)
        //let ticketBasePrice = res[0].base_ticket_cost
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
    clearContent();
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
    ticketInfo.forEach( thisTicketInfo=> {

        let ssn = thisTicketInfo.querySelectorAll('.ssn')[0].value
        // checks if ssn is empty string and assign that boolean value to a variable
        const isSsnValid = (ssn != '')

        let flightID = thisTicketInfo.querySelectorAll('.flight_id')[0].value
        const isFlightIDValid = (flightID != '')

        let flightID2 = thisTicketInfo.querySelectorAll('.flight_id_2')[0].value
        const isFlightID2Valid = (flightID != flightID2)
        flightID2 = setProperNullValueIfNullForFlightID2(flightID2)

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
            if([isSsnValid, isFlightIDValid, isFlightID2Valid, isCreditCardNumValid, isNumBagsValid].every(val => val === true)) {


                // This means we have a valid form
                // creates a dictionary if the ticket info is valid and pushes it to an array of valid tickets
                const thisValidTicketInfo = {
                    ssn: ssn,
                    flightID: flightID,
                    flightID2: flightID2,
                    classType: classType,
                    creditCardNum: creditCardNum,
                    discountCode: discountCode,
                    numBags: numBags
                }
                allValidTickets.push(thisValidTicketInfo)  
            } 
            if(!isSsnValid) {
                thisTicketInfo.querySelectorAll(`.error_ssn`)[0].innerText = "SSN is required. Please fill in a value"
            }
            if(!isFlightIDValid) {
                thisTicketInfo.querySelectorAll(`.error_flight_id`)[0].innerText = "Flight ID is required. Please fill in a value"
            }
            if(!isFlightID2Valid) {
                thisTicketInfo.querySelectorAll(`.error_flight_id_2`)[0].innerText = "The second flight ID cannot be the same as the first flight ID"
            }
            if(!isCreditCardNumValid) {
                thisTicketInfo.querySelectorAll(`.error_creditCardNum`)[0].innerText = "Credit card number is required. Please fill in a value"
            }
            if(!isNumBagsValid) {
                thisTicketInfo.querySelectorAll(`.error_numBags`)[0].innerText = "Number of bags is required. Please fill in a value"
            }
            
        }
    }) 


    // removes tickets from allValidTickets that have ssn or flightid that do not exist on the databse 
    let allFullyValidedTickets = []
    for (let j = 0; j < allValidTickets.length; j++) {
        let ssnExist = await doesSsnExist(allValidTickets[j])
        let flightIdExists = await doesFlightIdExist(allValidTickets[j])
        let flightId2Exists = await doesFlightId2Exist(allValidTickets[j])
        let discountCodeExists = await doesDiscountCodeExist(allValidTickets[j])
        let isValidConnectingFlight = true
        if (allValidTickets[j].flightID2 != '-1') {
            isValidConnectingFlight = await doesConnectingFlightExist(allValidTickets[j])
        } 

        if (!ssnExist) {
            document.getElementById(`buyTicketsResults${j}`).innerText = `Error: The SSN ${allValidTickets[j].ssn} does not exist. Please register it above before buying a ticket with it.\n`
        }
        if (!flightIdExists) {
            document.getElementById(`buyTicketsResults${j}`).innerText = `Error: The flightID ${allValidTickets[j].flightID} does not exist. Please choose a valid flight.\n`
        }
        if (!flightId2Exists) {
            document.getElementById(`buyTicketsResults${j}`).innerText = `Error: The connecting flightID ${allValidTickets[j].flightID2} does not exist. Please choose a valid flight.\n`
        } 
        if (!isValidConnectingFlight) {
            document.getElementById(`buyTicketsResults${j}`).innerText = `Error: The connecting flightID ${allValidTickets[j].flightID2} does not exist. Please choose a valid flight.\n`
        } 
        if (!discountCodeExists) {
            document.getElementById(`buyTicketsResults${j}`).innerText = `Error: The discount code ${allValidTickets[j].discountCode} does not exist. Please choose a valid discount code or leave the discount code field blank.`
        }
        if(ssnExist && flightIdExists && flightId2Exists && isValidConnectingFlight && discountCodeExists) {
            allFullyValidedTickets.push(allValidTickets[j])
        }
    }

    // using the valid ticket information, this queries the database for the base ticket cost,
    // discount codes, and calculates the final cost.
    // It then displays which tickets were sucessfully bought
    
    //console.log('length:' + allFullyValidedTickets.length)
    if(allFullyValidedTickets.length > 0 && (allFullyValidedTickets.length === allValidTickets.length)) {

        allFullyValidedTickets = await getTotalTicketCost(allFullyValidedTickets)
        let saveTickRes = await saveTicketInfo(allFullyValidedTickets)

        if(saveTickRes === 'Error: Could not add valid ticket(s) to the database') {
            document.getElementById(`buyTicketsResults`).innerText = `Error: Could not buy tickets.\n`
        } 
        else if(saveTickRes === 'Error: not enough seats left') {
            document.getElementById(`buyTicketsResults`).innerText = 
            `Error: Not enough seats left for the seating class for at least one of the tickets you wanted to buy.
            Either choose a different class, add yourself to the waitlist, try buying fewer tickets at once, or try again later`
        } 
        else if (saveTickRes.length > 0) {
            for(let i = 0; i < allFullyValidedTickets.length; i++){
                if(saveTickRes[i].flightid2 === '-1') {
                    document.getElementById(`buyTicketsResults${i}`).innerText = 
                    `Successfully bought a ticket for the person with SSN: ${saveTickRes[i].ssn} on flight with flightID: ${saveTickRes[i].flightid}
                    The ticket number is ${saveTickRes[i].ticketno} and the final price was $${saveTickRes[i].finalprice}.\n`
                } 
                else {
                    document.getElementById(`buyTicketsResults${i}`).innerText = 
                    `Successfully bought a ticket for the person with SSN: ${saveTickRes[i].ssn} on flight with flightID: ${saveTickRes[i].flightid} and connecting flightID ${saveTickRes[i].flightid2}
                    The ticket number is ${saveTickRes[i].ticketno} and the final price was $${saveTickRes[i].finalprice}.\n`
                } 
            }
        }
        //console.log(res)
    } else {
        document.getElementById(`buyTicketsResults`).innerText = `Error: Please enter valid information to buy a ticket\n`
    }

    document.querySelector('form').reset();
}
/* document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buyTicketBtn').addEventListener('click', clearContent());
});*/
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
        //
        try{
            //editing the table in inputForm.html
            let flightInfoPush = "";
            if(res == 0){
                document.getElementById('boardingPass1').innerText = "no tickets";
            }
            else if(res[0].is_cancelled === true){
                document.getElementById('boardingPass1').innerText = "cancelled";
            }
            else{
                for(let i=0; i<res.length; i++){
                    flightInfoPush += 
                    `<tr>
                    <th>${res[i].ticket_no}</th>
                    <th>${res[i].flight_id}</th>
                    <th>${res[i].class_type}</th>
                    <th>${res[i].num_bags}</th>
                    <th>${res[i].f1_sch_departure_time}</th>
                    <th>${res[i].f1_sch_arrival_time}</th>
                    <th>${res[i].f1_departure_airport_id}</th>
                    <th>${res[i].f1_arrival_airport_id}</th>
                    <th>${res[i].f1_status}</th>
                    <th>$${res[i].final_price}</th>
                    </tr>`;
                }   
                boardingPass1.innerHTML = flightInfoPush;
    
                //editing the table in inputForm.html
                flightInfoPush = "";
                if(res[0].flight_id_2 === -1){
                    document.getElementById('boardingPass2').innerText = "no connected flight";
                }
                else{
                    for(let i=0; i<res.length; i++){
                        flightInfoPush += 
                        `<tr>
                        <th>${res[i].ticket_no}</th>
                        <th>${res[i].flight_id_2}</th>
                        <th>${res[i].class_type}</th>
                        <th>${res[i].num_bags}</th>
                        <th>${res[i].f2_sch_departure_time}</th>
                        <th>${res[i].f2_sch_arrival_time}</th>
                        <th>${res[i].f2_departure_airport_id}</th>
                        <th>${res[i].f2_arrival_airport_id}</th>
                        <th>${res[i].f2_status}</th>
                        </tr>`;
                    }   
                    boardingPass2.innerHTML = flightInfoPush;
                }
                
            }
        }
        catch(err){
            console.log(err.message);
        }
        document.getElementById('checkStatusResults').innerText = JSON.stringify(res); 
        document.querySelector('form').reset();
    }

    
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('checkStatusBtn').addEventListener('click', checkTicketStatus);
});

const getWaitlistInfo = async(ev)=>{
    ev.preventDefault();  //to stop the form submitting
    clearContent();
    let waitListInfo = []
    let allValidTickets = []

    // This gets all of the values entered by the user when they buy tickets
    // it creates an array of length 5, as we ask for info for 5 tickets
    // if the fields are left empty, it still makes a ticket in the array for it 
    waitListInfo = document.querySelectorAll('.waitListInfo')

    // this loop goes through the array of tickets and creates a new array that only contains 
    // valid tickets. currently an invalid ticket is one that is missing values from any of the fields
    // besides discount code
    // TODO: add much more error checking 
    waitListInfo.forEach( thisTicketInfo=> {

        let ssn = thisTicketInfo.querySelectorAll('.ssn')[0].value
        // checks if ssn is empty string and assign that boolean value to a variable
        const isSsnValid = (ssn != '')

        let flightID = thisTicketInfo.querySelectorAll('.flight_id')[0].value
        const isFlightIDValid = (flightID != '')

        let flightID2 = thisTicketInfo.querySelectorAll('.flight_id_2')[0].value
        const isFlightID2Valid = (flightID != flightID2)
        flightID2 = setProperNullValueIfNullForFlightID2(flightID2)

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
            if([isSsnValid, isFlightIDValid, isFlightID2Valid, isCreditCardNumValid, isNumBagsValid].every(val => val === true)) {


                // This means we have a valid form
                // creates a dictionary if the ticket info is valid and pushes it to an array of valid tickets
                const thisValidTicketInfo = {
                    ssn: ssn,
                    flightID: flightID,
                    flightID2: flightID2,
                    classType: classType,
                    creditCardNum: creditCardNum,
                    discountCode: discountCode,
                    numBags: numBags
                }
                allValidTickets.push(thisValidTicketInfo)  
            } 
            if(!isSsnValid) {
                thisTicketInfo.querySelectorAll(`.error_ssn`)[0].innerText = "SSN is required. Please fill in a value"
            }
            if(!isFlightIDValid) {
                thisTicketInfo.querySelectorAll(`.error_flight_id`)[0].innerText = "Flight ID is required. Please fill in a value"
            }
            if(!isFlightID2Valid) {
                thisTicketInfo.querySelectorAll(`.error_flight_id_2`)[0].innerText = "The second flight ID cannot be the same as the first flight ID"
            }
            if(!isCreditCardNumValid) {
                thisTicketInfo.querySelectorAll(`.error_creditCardNum`)[0].innerText = "Credit card number is required. Please fill in a value"
            }
            if(!isNumBagsValid) {
                thisTicketInfo.querySelectorAll(`.error_numBags`)[0].innerText = "Number of bags is required. Please fill in a value"
            }
            if(!isFlightID2Valid) {
                thisTicketInfo.querySelectorAll(`.error_flight_id_2`)[0].innerText = "The second flight ID cannot be the same as the first flight ID"
            }
            
        }
    }) 


    // removes tickets from allValidTickets that have ssn or flightid that do not exist on the databse 
    let allFullyValidedTickets = []
    for (let j = 0; j < allValidTickets.length; j++) {
        let ssnExist = await doesSsnExist(allValidTickets[j])
        let flightIdExists = await doesFlightIdExist(allValidTickets[j])
        let flightId2Exists = await doesFlightId2Exist(allValidTickets[j])
        let discountCodeExists = await doesDiscountCodeExist(allValidTickets[j])
        let isValidConnectingFlight = await doesConnectingFlightExist(allValidTickets[j])

        if (!ssnExist) {
            document.getElementById(`waitListResults${j}`).innerText = `Error: The SSN ${allValidTickets[j].ssn} does not exist. Please register it above before buying a ticket with it.\n`
        }
        if (!flightIdExists) {
            document.getElementById(`waitListResults${j}`).innerText = `Error: The flightID ${allValidTickets[j].flightID} does not exist. Please choose a valid flight.\n`
        }
        if (!flightId2Exists) {
            document.getElementById(`waitListResults${j}`).innerText = `Error: The connecting flightID ${allValidTickets[j].flightID2} does not exist. Please choose a valid flight.\n`
        }  
        if (!isValidConnectingFlight) {
            document.getElementById(`waitListResults${j}`).innerText = `Error: FlightID ${allValidTickets[j].flightID2} is an invalid connecting flight for flightID ${allValidTickets[j].flightID}. Please choose a valid connecting flight.\n`
        }   
        if (!discountCodeExists) {
            document.getElementById(`buyTicketsResults${j}`).innerText = `Error: The discount code ${allValidTickets[j].discountCode} does not exist. Please choose a valid discount code or leave the discount code field blank.\n`
        }
        if(ssnExist && flightIdExists && flightId2Exists && isValidConnectingFlight && discountCodeExists) {
            allFullyValidedTickets.push(allValidTickets[j])
        }
    }
    console.log('length:' + allFullyValidedTickets.length)
    if(allFullyValidedTickets.length > 0 && (allFullyValidedTickets.length === allValidTickets.length)) {

        allFullyValidedTickets = await getTotalTicketCost(allFullyValidedTickets)
        let saveWaitListRes = await saveWaitListInfo(allFullyValidedTickets)
        if(saveWaitListRes === "There are seats left on this flight." ) {
            document.getElementById(`waitListResults`).innerText = `There are still seats left on this flight. Please book your flight above.
            If there are not enough seats left for your entire party, either book fewer seats and waitlist the rest, 
            or wait for more seats to open up before trying to book your whole party.\n`
        }
        else if (saveWaitListRes.length > 1) {
            let waitListPositionRes = await getWaitListPosition(saveWaitListRes)
            for(let i = 0; i < allFullyValidedTickets.length; i++){
                if(saveWaitListRes[i].flightid2 === '-1') {
                    document.getElementById(`waitListResults${i}`).innerText = 
                    `Successfully added the person with SSN: ${saveWaitListRes[i].ssn} to the waitlist for flight with flightID: ${saveWaitListRes[i].flightid}
                    Your waitlist number ID ${saveWaitListRes[i].waitlist_id} and your position on the waitlist is ${waitListPositionRes}.\n`
                } 
                else {
                    document.getElementById(`waitListResults${i}`).innerText = 
                    `Successfully the person with SSN: ${saveWaitListRes[i].ssn} to the waitlist for flight with flightID: ${saveWaitListRes[i].flightid} and connecting flightID ${saveWaitListRes[i].flightid2}
                    Your waitlist number ID ${saveWaitListRes[i].waitlist_id} and your position on the waitlist is ${waitListPositionRes}.\n`
                } 
            }
        } else {
            document.getElementById(`waitListResults`).innerText = `Error: Could not add you to the waitlist.\n`
        }
    } else {
        document.getElementById(`waitListResults`).innerText = `Error: Please enter valid information to get added to a waitlist\n`
    }

    document.querySelector('form').reset();
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('waitListBtn').addEventListener('click', getWaitlistInfo);
});
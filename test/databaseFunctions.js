export async function saveCustomer(thisCustomer) 
{
    // do validation
    // call database function 
    // wait on the results 

    const response = await fetch(`http://localhost:5000/addCustomer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(thisCustomer)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function getFlightsDetails(flightCities) {
    const response = await fetch(`http://localhost:5000/searchFlight`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(flightCities)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function getConnectedFlightDetails(flightCities){
    const response = await fetch(`http://localhost:5000/searchConnectedFlight`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(flightCities)});
    let res = await response.json()
    console.log("here");
    return res;
}

export async function saveTicketInfo(validTicketInfo) 
{
    // do validation
    // call database function 
    // wait on the results 

    const response = await fetch(`http://localhost:5000/saveTicketInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(validTicketInfo) });
    let res = await response.json()
    console.log(res)
    return res;
}

export async function getTicketBasePrice(thisValidTicket) {
    const response = await fetch(`http://localhost:5000/ticketBasePrice`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(thisValidTicket)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function getDiscountInfo(thisDiscountCode) {
    const response = await fetch(`http://localhost:5000/discountInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(thisDiscountCode)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function checkSSN(cust) {
    const response = await fetch(`http://localhost:5000/checkSSN`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(cust)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function checkTicket(tick) {
    const response = await fetch(`http://localhost:5000/checkTicket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(tick)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function getTicketDetails(tick) {
    const response = await fetch(`http://localhost:5000/getTicketDetails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(tick)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function cancelThisTicket(tick) {
    const response = await fetch(`http://localhost:5000/cancelTicket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(tick)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function getClassType(tick) {
    const response = await fetch(`http://localhost:5000/getClassType`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(tick)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function doesFlightIdExist(tick) {
    const response = await fetch(`http://localhost:5000/doesFlightIdExist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(tick)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function doesFlightId2Exist(tick) {
    const response = await fetch(`http://localhost:5000/doesFlightId2Exist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(tick)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function doesSsnExist(tick) {
    const response = await fetch(`http://localhost:5000/doesSsnExist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(tick)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function howManySeatsLeft(tick) {
    const response = await fetch(`http://localhost:5000/howManySeatsLeft`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(tick)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function saveWaitListInfo(info) {
    const response = await fetch(`http://localhost:5000/saveWaitListInfo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(info)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function getWaitListPosition(info) {
    const response = await fetch(`http://localhost:5000/getWaitListPosition`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(info)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function doesDiscountCodeExist(code) {
    const response = await fetch(`http://localhost:5000/doesDiscountCodeExist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(code)});
    let res = await response.json()
    console.log(res)
    return res;
}

export async function doesConnectingFlightExist(flightInfo) {
    const response = await fetch(`http://localhost:5000/doesConnectingFlightExist`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(flightInfo)});
    let res = await response.json()
    console.log(res)
    return res;
}

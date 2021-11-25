export async function saveCustomer(thisCustomer) 
{
    // do validation
    // call database function 
    // wait on the results 

    const response = await fetch(`http://localhost:5000/addCustomer`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(thisCustomer)
        }
    );
    let res = await response.json()
    console.log(res)
    return res;
}

export async function getFlightsDetails(flightCities) 
{
    // do validation
    // call database function 
    // wait on the results 

    const response = await fetch(`http://localhost:5000/searchFlight`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(flightCities)
        }
    );
    let res = await response.json()
    console.log(res)
    return res;
}

export async function saveTicketInfo(validTicketInfo) 
{
    // do validation
    // call database function 
    // wait on the results 

    const response = await fetch(`http://localhost:5000/buyTicket`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(validTicketInfo)
        }
    );
    let res = await response.json()
    console.log(res)
    return res;
}
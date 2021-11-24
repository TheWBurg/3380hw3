import { saveCustomer } from "../test/databaseFunctions.js";

export function exportedCall() {
    console.log('Exported was called');
}


//let customers = [];
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
    var res = await saveCustomer(thisCustomer);

    //customers.push(thisCustomer);
    //document.forms[0].reset(); // to clear the form for the next entries
    document.querySelector('form').reset();


}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn').addEventListener('click', addCustomer);
});

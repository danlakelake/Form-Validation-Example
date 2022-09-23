'use strict';

// Variables for DOM elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm-password");


// Show error message on input
function showError(input, message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message
    const icons = formControl.querySelector('svg');
    icons.style.color = 'red';
}

// Show success message on input
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const icons = formControl.querySelector('svg');
    icons.style.color = 'green';
}

//Check email is valid
function checkEmail(input){
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (pattern.test(input.value.trim())) {
        showSuccess(input);
    } else{
        showError(input, 'Email is not valid');
    }
}

//Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }
        else{
            showSuccess(input);
        }
    });
}


//Check input length
function checkLength(input, min, max){
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else{
        showSuccess(input);
    }

}

//Check passwords match 
function checkPasswordsMatch(input1, input2){
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

//Get field name
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check all inputs are correct and display data
function inputsAll(){
    
    const inputs  = document.querySelectorAll('.form-control');
    const success_inputs = document.querySelectorAll('.success');

    if (inputs.length == success_inputs.length ) {
        const container_info = document.getElementById('info');
        container_info.style.display = 'inline-block';
        const d_username = document.getElementById('d_username');
        d_username.innerHTML = `<strong>Username:</strong> ${username.value}`;
        const d_email = document.getElementById('d_email');
        d_email.innerHTML =  `<strong>E-mail:</strong> ${email.value} `;
        const d_password= document.getElementById('d_password');
        d_password.innerHTML = `<strong>Password:</strong> ${password.value}`;
    } 
 }


// Event Listeners
form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username, email, password, confirm_password]);
    checkLength(username, 3, 15);
    checkEmail(email);
    checkLength(password, 6, 25);
    checkPasswordsMatch(password, confirm_password);
    inputsAll();
});









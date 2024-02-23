const emailInput = document.getElementById('email')
const emailError = document.getElementById('email-error')
const passwordInput = document.getElementById('password')
const passwordError = document.getElementById('password-error')
const form = document.getElementById('form')


form.addEventListener('submit', (e) => {
    const email_validation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z0-9]{2,4}$)/
    if(!emailInput.value.match(email_validation)) {
        emailError.innerHTML = "please your email is incorrect"
        e.preventDefault()
       }
       else {
        emailError.innerHTML = "";
        emailInput.value =""
       }
    
        if(passwordInput.value.length <= 5) {
        passwordError.innerText = "password must be more that 5 characters"
        e.preventDefault()
       }
       else {
        passwordError.innerHTML = "";
       passwordInput.value =""
       }
})

// SHOW OR HIDE PASSWORD

const passwordField = document.getElementById('password');
 const showPass = document.getElementById('show-password');
    
 showPass.addEventListener('click', ()=>{
    const type = passwordField.getAttribute('type') === "password"?
    'text' : 'password'
    passwordField.setAttribute('type', type)
})
const loginButton = document.getElementById('send');

loginButton.addEventListener('click', () => {
    window.location.href = './adminPanel/dashboard.html';
});

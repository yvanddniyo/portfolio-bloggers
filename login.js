const emailInput = document.getElementById('email')
const emailError = document.getElementById('email-error')
const passwordInput = document.getElementById('password')
const passwordError = document.getElementById('password-error')
const form = document.getElementById('form')


form.addEventListener('submit', (e) => {
    if(emailInput.value === '' || emailInput.value === null) {
        emailError.innerHTML = "please your email required"
        e.preventDefault()
       }
       else {
        emailError.innerHTML = "";
        emailInput.value =""
       }
    
        if(passwordInput.value.length <=5) {
        passwordError.innerText = "password must be more that 5 characters"
        e.preventDefault()
       }
       else {
        passwordError.innerHTML = "";
       passwordInput.value =""
    
       }
})

const passwordField = document.getElementById('password');
 const showPass = document.getElementById('show-password');
    
 showPass.addEventListener('click', ()=>{
    const type = passwordField.getAttribute('type') === "password"?
    'text' : 'password'
    passwordField.setAttribute('type', type)
})
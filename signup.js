const form = document.getElementById('form')
const usernameInput = document.getElementById('username')
const usernameError  = document.getElementById('username-error')
const emailInput = document.getElementById('email')
const emailError = document.getElementById('email-error')
const passwordInput = document.getElementById('password')
const passwordError = document.getElementById('password-error')
const confirmPassword = document.getElementById('confirm-password')
const confirmPasswordError = document.getElementById('confirm-password-error')
const equalPasswordError = document.getElementById('equal-password-error')


form.addEventListener('submit', (e) => {
   if(usernameInput.value === "" || usernameInput.value === null) {
    usernameError.innerText = "please your username required"
       e.preventDefault()
   }
   else {
    usernameError.innerHTML ="";
    usernameInput.value =""
   }
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

   if(confirmPassword.value.length <=5) {
    confirmPasswordError.innerHTML = "password must be more that 5 characters"
    e.preventDefault()
   }
   
   else {
    confirmPassword.value = "";
    confirmPasswordError.innerHTML = '';
   }

   if (passwordInput.value != confirmPassword.value) {
    equalPasswordError.innerHTML = "please your password not match"
       e.preventDefault()
  } else {
    passwordInput.value = '';
    confirmPassword.value ="";
    equalPasswordError.innerHTML = "";

  }
  
})




const passwordField = document.getElementById('password');
const confirmPasswords = document.getElementById('confirm-password');
const showPass = document.getElementById('show-password');

// CHECKING IF PASSWORDS ARE SAME

const checkSamePassword = () =>  {
   if(passwordField.value != confirmPassword.value) {
      document.getElementById('create-same-pass').style.color = 'red';
      document.getElementById('create-same-pass').innerHTML = 'Please use same password!';
      document.getElementById('send').style.disable = 'true';
      document.getElementById('send').style.opacity = '0.4';
   }
   else {
      document.getElementById('create-same-pass').style.color = 'green';
      document.getElementById('create-same-pass').innerHTML = 'Relax, password are same';
      document.getElementById('send').style.disable = 'false';
      document.getElementById('send').style.opacity = '1'; 
   }
}

// SHOWING PASSWORD OR HIDE IT
 showPass.addEventListener('click', ()=>{
    const type = passwordField.getAttribute('type') === "password"?
    'text' : 'password'
    passwordField.setAttribute('type', type)
    confirmPassword.setAttribute('type', type)
 
})
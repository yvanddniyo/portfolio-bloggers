const emailInput = document.getElementById('email')
const emailError = document.getElementById('email-error')
const passwordInput = document.getElementById('password')
const passwordError = document.getElementById('password-error')
const form = document.getElementById('form')


form.addEventListener('submit', (e) => {
    const email_validation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z0-9]{2,4}$)/
    if(!emailInput.value.match(email_validation)) {
        emailError.innerHTML = "please your email is incorrect"
        // e.preventDefault()
       }
       else {
        emailError.innerHTML = "";
        emailInput.value =""
       }
    
        if(passwordInput.value.length <= 5) {
        passwordError.innerText = "password must be more that 5 characters"
        // e.preventDefault()
       }
       else {
        passwordError.innerHTML = "";
       passwordInput.value =""
       }
})
// remove ERROR

const startTyping = () => {
    if (emailInput.value) {
      emailError.innerText = ""
    }
   if(passwordInput.value){
      passwordError.innerText = ""
    }
  }

  //  Login sessions

  const login = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = storedUsers.find(u => u.email === email && u.password === password);

    if (user) {
        if (user.role === "admin") {
            alert('logged as an admin');
            setTimeout(() => {
                window.location.href = '../Html/adminHTML/dashboard.html';
            }, 500);
        } else {
            alert('Login successful!');
            setTimeout(() => {
                window.location.href = '../Html/blogs.html';
            }, 500);

            // Store the currently logged-in user's information in local storage
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Update the select element with the logged-in user's name
            const loginUser = JSON.parse(localStorage.getItem('loggedInUser')) ||[]
            console.log(loginUser);
            const loginUserName = document.getElementById("login-user-name");
            loginUserName.innerText = `Logged in as ${loginUser.name}`; // Assuming user has a "name" property
        }
    } else {
        alert('Wrong password or email');
    }
};


  



  // SHOW OR HIDE PASSWORD

const passwordField = document.getElementById('password');
 const showPass = document.getElementById('show-password');
    
 showPass.addEventListener('click', ()=>{
    const type = passwordField.getAttribute('type') === "password"?
    'text' : 'password'
    passwordField.setAttribute('type', type)
})


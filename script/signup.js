const form = document.getElementById('form')
const usernameInput = document.getElementById('username')
const usernameError = document.getElementById('username-error')
const emailInput = document.getElementById('email')
const emailError = document.getElementById('email-error')
const passwordInput = document.getElementById('password')
const passwordError = document.getElementById('password-error')
const confirmPassword = document.getElementById('confirm-password')
const confirmPasswordError = document.getElementById('confirm-password-error')
const equalPasswordError = document.getElementById('equal-password-error')
const signup = document.getElementById('sign-up')

const signUpButton = document.getElementById('send');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  usernames = usernameInput.value;
  emailInputs = emailInput.value;
  const userObj = {
    username: usernames,
    email: emailInputs,
    password: passwordInput.value
  };

  signUpButton.textContent = 'Loading...';
  signUpButton.disabled = true;

  const uri = 'https://be-portofolio-bloger-2.onrender.com/api/v1/auth/register';
  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObj)
    });

    if (response.ok) {
      Swal.fire({
        text: "Your account was successfully created",
        icon: "success",
        footer: '<a href="../../Html/login.html">Please Log in</a>',
      });
    } else {
      Swal.fire({
        text: "Your account failed to create or the email is already in use",
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      text: "Your account failed to create or the email is already in use",
      icon: "error",
    });
  } finally {

    signUpButton.textContent = 'Sign Up';
    signUpButton.disabled = false;
  }
});

const showPopup = (message, color, redirectUrl = null) => {
  const popupContainer = document.getElementById('popup-container');
  const popupMessage = document.getElementById('popup-message');
  const popupOk = document.getElementById('popup-ok');
  console.log(popupOk)
  popupMessage.textContent = message;
  popupMessage.style.color = color;
  popupContainer.style.display = 'block';

  popupOk.addEventListener('click', (e) => {
    e.preventDefault()
    popupContainer.style.display = 'none';

    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  });
}

form.addEventListener('submit', (e) => {
  const email_validation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z0-9]{2,4}$)/

  if (usernameInput.value === "" || usernameInput.value === null) {
    usernameError.innerText = "please your username required"
    e.preventDefault()
  }
  else {
    usernameError.innerHTML = "";
    usernameInput.value = ""
  }
  if (!emailInput.value.match(email_validation)) {
    emailError.innerHTML = "please your email is incorrect"
    e.preventDefault()
  }
  else {
    emailError.innerHTML = "";
    emailInput.value = ""
  }

  if (passwordInput.value.length <= 5) {
    passwordError.innerText = "password must be more that 5 characters"
    e.preventDefault()
  }
  else {
    passwordError.innerHTML = "";
    passwordInput.value = ""

  }

  if (confirmPassword.value.length <= 5) {
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
    confirmPassword.value = "";
    equalPasswordError.innerHTML = "";

  }

})

// remove error

const startTyping = () => {
  if (usernameInput.value) {
    usernameError.innerText = ""
    // messageError.innerText = ""

  }
  if (emailInput.value) {
    emailError.innerText = ""
  }
  if (passwordInput.value) {
    passwordError.innerText = ""
  }
}

const passwordField = document.getElementById('password');
const confirmPasswords = document.getElementById('confirm-password');
const showPass = document.getElementById('show-password');
let removeConf;

// CHECKING IF PASSWORDS ARE SAME

const checkSamePassword = () => {
  if (passwordField.value != confirmPassword.value) {
    document.getElementById('create-same-pass').style.color = 'red';
    document.getElementById('create-same-pass').innerHTML = 'Please use same password!';
    document.getElementById('send').style.disable = 'true';
    document.getElementById('send').style.opacity = '0.4';
  }
  else {
    document.getElementById('create-same-pass').style.color = 'green';
    removeConf = document.getElementById('create-same-pass').innerHTML = 'Relax, password are same';
    document.getElementById('send').style.disable = 'false';
    document.getElementById('send').style.opacity = '1';

  }
  if (removeConf) {
    document.getElementById('create-same-pass').innerHTML = '';
  }
}

// SHOWING PASSWORD OR HIDE IT
showPass.addEventListener('click', () => {
  const type = passwordField.getAttribute('type') === "password" ?
    'text' : 'password'
  passwordField.setAttribute('type', type)
  confirmPassword.setAttribute('type', type)

})

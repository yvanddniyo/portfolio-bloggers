const emailInput = document.getElementById('email')
const emailError = document.getElementById('email-error')
const passwordInput = document.getElementById('password')
const passwordError = document.getElementById('password-error')
const form = document.getElementById("form")
const messageLogin = document.getElementById('login-user')

const signup = document.getElementById('sign-up')
const signUpButton = document.getElementById('send');
let tokenDecode;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const emailInputs = emailInput.value;
  const passwordInputs = passwordInput.value;

  const loginObj = {
    email: emailInputs,
    password: passwordInputs
  };

  signUpButton.textContent = 'Loading...';
  signUpButton.disabled = true;

  const uri = 'https://be-portofolio-bloger-2.onrender.com/api/v1/auth/login';
  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginObj)
    });

    if (response.ok) {
      const data = await response.json()
      const token = data.token
      tokenDecode = token
      const decodedToken = decodeJWT(tokenDecode)
      const userRole = decodedToken.payload.role;
      localStorage.setItem('auth-token', token)
      if (userRole === 'user') {
        Swal.fire({
          text: "Your successfully logged in.",
          icon: "success",
          footer: ' <a href="../../Html/blogs.html">Click here to continue</a>'
        });
      }
      else if (userRole === 'admin') {
        Swal.fire({
          text: "Your successfully logged as Admin.",
          icon: "success",
          footer: '<a href="../../Html/blogs.html">Click here to continue</a>'
        });
      }
    }
    else {
      Swal.fire({
        text: "Hmm... incorrect password or username",
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      text: "Hmm... An error occurred. Please try again",
      icon: "error",
    });
  } finally {

    signUpButton.textContent = 'Log In';
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

const decodeJWT = (token) => {
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
  return { payload };
}

form.addEventListener('submit', (e) => {
  const email_validation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z0-9]{2,4}$)/
  if (!emailInput.value.match(email_validation)) {
    emailError.innerHTML = "please your email is incorrect"
    // e.preventDefault()
  }
  else {
    emailError.innerHTML = "";
    emailInput.value = ""
  }

  if (passwordInput.value.length <= 5) {
    passwordError.innerText = "password must be more that 5 characters"
    // e.preventDefault()
  }
  else {
    passwordError.innerHTML = "";
    passwordInput.value = ""
  }
})
// remove ERROR

const startTyping = () => {
  if (emailInput.value) {
    emailError.innerText = ""
  }
  if (passwordInput.value) {
    passwordError.innerText = ""
  }
}

//  Login sessions


// SHOW OR HIDE PASSWORD

const passwordField = document.getElementById('password');
const showPass = document.getElementById('show-password');

showPass.addEventListener('click', () => {
  const type = passwordField.getAttribute('type') === "password" ?
    'text' : 'password'
  passwordField.setAttribute('type', type)
})


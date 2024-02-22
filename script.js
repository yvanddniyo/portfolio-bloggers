 const hamburger = document.querySelector('.menus')
 const navbars = document.querySelector('.container-navbar-lists')

 hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active')
    navbars.classList.toggle('active')
 })
 document.querySelectorAll('.container-navbar-lists li').forEach(n => {
   n.addEventListener('click', () => {
       hamburger.classList.remove('active');
       navbars.classList.remove('active');
   });
});


    const scrollContainer = document.querySelector(".my-project");
    const backBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
   
    
    backBtn.addEventListener('click', () => {
       scrollContainer.style.scrollBehavior ="smooth"
        scrollContainer.scrollLeft += 500;
    });
    
    nextBtn.addEventListener('click', () => {
      scrollContainer.style.scrollBehavior ="smooth"
        scrollContainer.scrollLeft -=500;
    });
   
// adding the script for checking validation

const nameInput = document.getElementById('name');
const nameError = document.getElementById('name-error');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const messageInput = document.getElementById('message');
const messageError = document.getElementById('message-error');
const submit = document.getElementById('send');
const form  = document.getElementById('form')

form.addEventListener('submit', (e)=> {
  if (nameInput.value === '' || nameInput === null) {
    nameError.innerText = "please your name required"
    e.preventDefault();
  }
  else {
    nameError.innerText =""
  }
  
  if (emailInput.value === '' || emailInput === null) {
    emailError.innerText = "please your email required"
    e.preventDefault();
  }
  else {
    emailError.innerText = ""
  }
  if (messageInput.value === '' || messageInput === null) {
    messageError.innerText = "please your message required"
    e.preventDefault();
  }
  else if (messageInput.value.length <= 12) {
    messageError.innerText = "must have at least 12 character to up"
    e.preventDefault();
  }
  else {
    messageError.innerText =""
  }
})

 
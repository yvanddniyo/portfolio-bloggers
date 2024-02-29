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

  //  REXEXPRESSION THAT CHECK AN EMAIL

  const email_validation = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z0-9]{2,4}$)/

  if (nameInput.value === '' || nameInput === null) {
    e.preventDefault();
    nameError.innerText = "please your name required"
  }
  else {
    nameError.innerText ="";
    nameError.value ="";
  }
  
  if (!emailInput.value.match(email_validation)) {
    e.preventDefault();
    emailError.innerText = "please your email incorrect"
  }
  else {
    
    emailError.innerText = "";
    emailError.value = "";
  }
  if (messageInput.value === '' || messageInput === null) {
    e.preventDefault();
    messageError.innerText = "please your message required"
  }
  else if (messageInput.value.length <= 12) {
    e.preventDefault();
    messageError.innerText = "must have at least 12 character to up"
  }
  else {
    
    messageError.innerText ="";
    messageError.value="";
  }
})

// disable button of send without text
const contentInput = document.getElementById('message'); 
const buttonComment =  document.getElementById('send');


const disableCommentButton = () => {
   if (contentInput.value) {
      buttonComment.style.disable = "false"
      buttonComment.style.opacity = "1"
   }
   else {
      buttonComment.style.disable = "true"
      buttonComment.style.opacity = "0.4"
   }
}

const startTyping = () => {
  if (nameInput.value  ) {
    nameError.innerText = ""
    // messageError.innerText = ""

  }
 if(emailInput.value){
    emailError.innerText = ""
  }
 if(messageInput.value){
    messageError.innerText = ""
  }
}



 
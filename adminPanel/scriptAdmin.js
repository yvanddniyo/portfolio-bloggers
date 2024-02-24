const hamburger = document.querySelector('.menus')
 const navbars = document.querySelector('.container-menu ')

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

// add blog js validation

const titleInput = document.getElementById('title')
const imageInput = document.getElementById('image')
const textAreaInput = document.getElementById('content')
const form = document.getElementById('form')
const titleError = document.getElementById('title-error')
const imageError = document.getElementById('image-error')
const textAreaError = document.getElementById('textarea-error')

form.addEventListener('submit', (e) => {
 if (titleInput.value === "" || titleInput.value === null) {
   e.preventDefault();
   titleError.innerText = 'please add title'
 } else {
   titleError.innerText = ''
   titleError.value = ''
 }
 if (imageInput.files.length === 0 || imageInput.value === null) {
   e.preventDefault();
   imageError.innerText = 'please choose an image'
 } else {
   imageError.innerText = ''
   imageError.value = ''
 }
 if (textAreaInput.value === '' || textAreaInput.value === null) {
   e.preventDefault();
   textAreaError.innerText = 'please add content'
 } else {
   textAreaError.innerText = ''
   textAreaError.value = ''
 } if (textAreaInput.value.length <=10) {
   e.preventDefault();
   textAreaError.innerText = 'sorry, you need to add more than 10 characters'
 }
  else{
   textAreaError.innerText = ''
   textAreaError.value = ''
 } 
})






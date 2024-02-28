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
 if (tinymce.get('content').getContent() === '' || tinymce.get('content').getContent()=== null) {
   e.preventDefault();
   textAreaError.innerText = 'please add content'
 } else {
   textAreaError.innerText = ''
   textAreaInput.value = ''}
  
 if (tinymce.get('content').getContent()<=10) {
   e.preventDefault();
   textAreaError.innerText = 'sorry, you need to add more than 10 characters'
 }
  else{
   textAreaError.innerText = ''
   textAreaError.value = ''
 } 
})



const commentForm = document.getElementById('comments');
const inputValue = document.getElementById('client-name'); 
const  nameError = document.getElementById('text-error')
const  contentInput = document.getElementById('content')
const  contentError = document.getElementById('word-needed')

commentForm.addEventListener('submit', (e) => {
   if(inputValue.value === '' || contentInput === null) {
       e.preventDefault();
       nameError.innerText = "your name"
   }
})





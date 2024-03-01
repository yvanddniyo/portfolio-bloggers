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
const commentForm = document.getElementById('comments');
const inputValue = document.getElementById('client-name'); 
const  nameError = document.getElementById('text-error')
const  contentInput = document.getElementById('content')
const  contentError = document.getElementById('word-needed')

// commentForm.addEventListener('submit', (e) => {
//    if(inputValue.value === '' || contentInput === null) {
//        e.preventDefault();
//        nameError.innerText = "your name"
//    }
// })

// adding message from clients

const messageContainer = document.getElementById('message-container')
document.addEventListener('DOMContentLoaded', () => {
messageContainer.innerHTML = "";
const message = JSON.parse(localStorage.getItem('messages')) || [];
console.log(message);



for (let i = 0; i < message.length && i < 7; i++) {
  const msg= message[i];
  // console.log(msg.id)
      const messageHTML =`
      <div class="message-clients" id="${msg.id}">
      <h2 style="font-size: 17px;">${msg.name}</h2>
      <h6 style="margin:10px 0; color: #456;">Email: ${msg.email}</h6>
      <p style="font-size: 14px;">${msg.message}</p>
      
          <button class="reply">Reply</button>
          <button class="delete" onclick="deleteMessage(this)">Delete</button>
      
  </div>
    `
    // console.log(blog.id);
   messageContainer.innerHTML += messageHTML 
}
})


const deleteMessage = (el) => {
  const message = JSON.parse(localStorage.getItem('messages')) || [];
  if (el.parentElement) {
      const msgId = el.parentElement.id;
      const messageIndex = message.findIndex(item => item.id === msgId);
      console.log(messageIndex);
      message.splice(messageIndex, 1);
      localStorage.setItem('messages', JSON.stringify(message));
      el.parentElement.remove();
  } else {
      console.error("Parent element is undefined");
  }
}







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
const nameError = document.getElementById('text-error')
const contentInput = document.getElementById('content')
const contentError = document.getElementById('word-needed')
const messageContainer = document.getElementById('message-container');
const messageDelete = document.getElementById('message-delete')
const msgLength = document.getElementById('msg')
const getLoader = document.getElementById("loader");

console.log(messageContainer)

let messageId;
document.addEventListener('DOMContentLoaded', async () => {
  messageContainer.innerHTML = "";
  getLoader.style.display = "block";
  await fetch('https://be-portofolio-bloger-2.onrender.com/api/v1/queries', {})
    .then(res => res.json())
    .then(messages => {
      getLoader.style.display = "none";
      messages.forEach(message => {
        messageId = message._id;
        const messageHTML = `
          <div class="message-clients" id="${message._id}">
            <h2 style="font-size: 17px;">${message.name}</h2>
            <h6 style="margin:10px 0; color: #456;">Email: ${message.email}</h6>
            <p style="font-size: 14px; width:200px; cursor:"pointer">${message.message} 
            </p>
           
            <button class="reply">Reply</button>
            <button class="delete" onclick="deleteMessage('${message._id}', this.parentNode)">Delete</button>
          </div>
        `;
        msgLength.textContent = `(${messages.length})`
        messageContainer.innerHTML += messageHTML;
      });

    });
});

const deleteMessage = async (messageId, messageElement) => {
  await fetch(`https://be-portofolio-bloger-2.onrender.com/api/v1/queries/${messageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      console.log(res);
      if (res.ok) {
        messageDelete.textContent = 'message successful deleted'
        messageElement.remove();
        messageDelete.style.color = "#17cf51"

        setInterval(() => {
          messageDelete.textContent = ''
        }, 5000);
      } else {
        console.log('delete goes wrong');
      }
    })
    .catch(error => {
      console.error('Error deleting message:', error);
    });
};







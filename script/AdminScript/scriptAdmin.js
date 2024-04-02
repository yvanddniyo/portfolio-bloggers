const hamburger = document.querySelector('.menus')
const navbars = document.querySelector('.container-menu ')
const blogCount = document.getElementById('blogs-count')
const usersCount = document.getElementById('users')

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

const showPopup = (message, color, callback) => {
  const popupContainer = document.getElementById("popup-container");
  const popupMessage = document.getElementById("popup-message");
  const popupOk = document.getElementById("popup-ok");
  const popupNo = document.getElementById("popup-no");
  popupMessage.textContent = message;
  popupMessage.style.color = color;
  popupContainer.style.display = "block";

  popupOk.addEventListener("click", async (e) => {
    e.preventDefault();
    popupNo.style.display = "none";
    popupContainer.style.display = "none";

    if (callback && typeof callback === 'function') {
      await callback();
    }
  });
  popupNo.addEventListener("click", async (e) => {
    e.preventDefault();
    popupContainer.style.display = "none";
  });
};

const deleteMessage = async (messageId, messageElement) => {
  try {
    showPopup(
      "Are you sure you want to delete message.",
      "#F48B2A",
      async () => {
        await fetch(`https://be-portofolio-bloger-2.onrender.com/api/v1/queries/${messageId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            console.log(res);
            if (res.ok) {

              // messageDelete.textContent = 'Are you sure to delete this message'
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
      }
    );
  } catch (error) {
    console.error('error occured during deleting:', error)
  }
}

/** Get the total of the Blogs */

const tokenNum = localStorage.getItem('auth-token')
const urlNumBlog = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs`
const getNumBlog = async () => {
  const response = await fetch(urlNumBlog, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': tokenNum
    }
  })
  const data = await response.json()
  blogCount.textContent = `(${data.length})`
  if (data.ok) {
    console.log(data)
  }
}
getNumBlog();
/** Get the total of the Users */
const urlNumUser = `https://be-portofolio-bloger-2.onrender.com/api/v1/users`
const getNumUser = async () => {
  const response = await fetch(urlNumUser, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': tokenNum
    }
  })
  const dataUser = await response.json()
  usersCount.textContent = `(${dataUser.length})`
  if (dataUser.ok) {
    console.log(dataUser)
  }
}
getNumUser();





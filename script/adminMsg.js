const nameInputs = document.getElementById('name');
const emailInputs = document.getElementById('email');
const messageInputs = document.getElementById('message');
const messagContainer = document.getElementById('message-container')
const forms = document.getElementById('form');

forms.addEventListener('submit', (event) =>{
  event.preventDefault(); 

  const name = nameInputs.value;
  const email = emailInputs.value;
  const message = messageInputs.value;

  const entryData = {
    name,
    email,
    message
  };
  fetch('https://be-portofolio-bloger-2.onrender.com/api/v1/queries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entryData)
  })
    .then(res => {
      if (res.ok) {
        messagContainer.textContent = " Message Successfully submitted";
        messagContainer.style.color = '#17cf51'
        nameInputs.value = "";
        emailInputs.value = "";
        messageInputs.value = "";

        setTimeout(() => {
          messagContainer.textContent = "";
        }, 5000);
      } else {
        messagContainer.textContent = "Failed to submit";
        messagContainer.style.color = '#F48B2A'
        
        nameInputs.value = "";
        emailInputs.value = "";
        messageInputs.value = "";

        setTimeout(() => {
          messageContainer.textContent = "";
        }, 5000);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while submitting the message.");
    });
});



// const messageFromClient = () => {
//     const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
  
//     const currentTimestamp = new Date().getTime();
//     const formattedTimestamp = new Date(currentTimestamp).toLocaleString();
  
//     const messObj = {
//       id: `${nameInputs.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
//       date: formattedTimestamp,
//       name: nameInputs.value,
//       email: emailInputs.value,
//       message: messageInputs.value
//     };
  
//     storedMessages.push(messObj);
  
//     localStorage.setItem('messages', JSON.stringify(storedMessages));
    
  
//     alert('Blog submitted successfully');
//   };

 // Render message NUMBER
// const message = JSON.parse(localStorage.getItem('messages')) || [];
// const msgs = document.getElementById('msg');
// msgs.innerText = message.length

// // Render USERS NUMBER
// const users =  JSON.parse(localStorage.getItem('users'))||[]
// const usr = document.getElementById('users')
// usr.innerText = users.length

// // Render blogs NUMBER

// const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
// const bgl = document.getElementById('blogs')
// bgl.innerText = blogs.length



  
  
  
  
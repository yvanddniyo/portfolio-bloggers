const nameInputs = document.getElementById('name');
const emailInputs = document.getElementById('email');
const messageInputs = document.getElementById('message');
const submits = document.getElementById('send');
// const form  = document.getElementById('form')


const messageFromClient = () => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
  
    const currentTimestamp = new Date().getTime();
    const formattedTimestamp = new Date(currentTimestamp).toLocaleString();
  
    const messObj = {
      id: `${nameInputs.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
      date: formattedTimestamp,
      name: nameInputs.value,
      email: emailInputs.value,
      message: messageInputs.value
    };
  
    storedMessages.push(messObj);
  
    localStorage.setItem('messages', JSON.stringify(storedMessages));
  
    alert('Blog submitted successfully');
  };

 // Render message NUMBER
const message = JSON.parse(localStorage.getItem('messages')) || [];
const msgs = document.getElementById('msg');
msgs.innerText = message.length

// Render USERS NUMBER
const users =  JSON.parse(localStorage.getItem('users'))||[]
const usr = document.getElementById('users')
usr.innerText = users.length

// Render blogs NUMBER

const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
const bgl = document.getElementById('blogs')
bgl.innerText = blogs.length


  
  
  
  
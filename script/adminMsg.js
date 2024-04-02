const nameInputs = document.getElementById('name');
const emailInputs = document.getElementById('email');
const messageInputs = document.getElementById('message');
const messagContainer = document.getElementById('message-container')
const forms = document.getElementById('form');
const signUpButton = document.getElementById('send');

forms.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = nameInputs.value;
  const email = emailInputs.value;
  const message = messageInputs.value;

  const entryData = {
    name,
    email,
    message
  };

  signUpButton.textContent = 'Loading...';
  signUpButton.disabled = true;
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
      signUpButton.textContent = 'send';
      signUpButton.disabled = true;
    })
    .catch(error => {
      console.error('Error:', error);
      alert("An error occurred while submitting the message.");
    });
});








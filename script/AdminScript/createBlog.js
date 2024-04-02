const formContainer = document.getElementById('form')
const blogTitle = document.getElementById('title')
const blogImage = document.getElementById('image')
const blogDescription = document.getElementById('content')
const blogSave = document.getElementById('save')
const saveButton = document.getElementById('save')
console.log(blogSave);

// const saveLocalStorage = () => {
//     const blogData = JSON.parse(localStorage.getItem('blogData')) || [];

//     if (blogImage.files.length > 0) {
//       const selectedImage = blogImage.files[0];

//       const reader = new FileReader();

//       reader.readAsDataURL(selectedImage);

//       reader.onload = function () {
//         const imageDataURL = reader.result;

//         const currentTimestamp = new Date().getTime();
//         const formattedTimestamp = new Date(currentTimestamp).toLocaleString();

//         const newBlog = {
//           id: `${blogTitle.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
//           title: blogTitle.value,
//           image: imageDataURL,
//           description: tinymce.get('content').getContent(),
//           comment: 0,
//           likes: 0,
//           date: formattedTimestamp
//         };

//         blogData.push(newBlog);
//         localStorage.setItem('blogData', JSON.stringify(blogData));

//         alert('Blog submitted successfully');
//       };
//     }
//   };

const showPopup = (message, color, redirectUrl = null) => {
  const popupContainer = document.getElementById("popup-container");
  const popupMessage = document.getElementById("popup-message");
  const popupOk = document.getElementById("popup-ok");
  console.log(popupOk);
  popupMessage.textContent = message;
  popupMessage.style.color = color;
  popupContainer.style.display = "block";

  popupOk.addEventListener("click", (e) => {
    e.preventDefault();
    popupContainer.style.display = "none";

    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  });
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const titleInputs = blogTitle.value;
  const imageFiles = blogImage.files[0];
  const textDescriptions = tinymce.get('content').getContent();

  const formData = new FormData();
  formData.append('title', titleInputs);
  formData.append('content', textDescriptions);
  formData.append('image', imageFiles);

  const token = localStorage.getItem('auth-token');
  saveButton.textContent = "Loading...";
  const urlBlog = 'https://be-portofolio-bloger-2.onrender.com/api/v1/blogs';

  fetch(urlBlog, {
    method: 'POST',
    headers: {
      'auth-token': token
    },
    body: formData
  })
    .then(response => {
      if (response.ok) {
        form.reset();
        return response.json();
      } else {
        throw new Error('Failed to create blog post');
      }
    })
    .then(responseData => {
      console.log('Blog post created successfully:', responseData);
      showPopup(
        " Blog is successfully Created.",
        "#F48B2A",
      );
    })
    .catch(error => {
      console.error('Error creating blog post:', error);
      showPopup(
        "Hmm... Error in creating  blog",
        "#F48B2A",
      );
    })
    .finally(() => {
      saveButton.textContent = "Save";
      saveButton.disabled = false;
    });
});






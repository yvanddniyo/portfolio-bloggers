const articleContainer = document.getElementById('container-article')
const saveBlog = document.getElementById('save')
const FormAdd = document.getElementById('form')
const formContainer = document.getElementById('form')
const blogTitle = document.getElementById('title')
const blogImage= document.getElementById('image')
const blogDescription= document.getElementById('content')
const blogSave= document.getElementById('save')


document.addEventListener('DOMContentLoaded', () => {

articleContainer.innerHTML = "";
const blogs = JSON.parse(localStorage.getItem('blogData')) || [];

for (let i = 0; i < blogs.length && i < 6; i++) {
  const blog = blogs[i];
      const articleHTML =`
      <div class="an-article" id="${blog.id}">
      <div class="image-article">
          <img src="${blog.image}" alt="blog">
      </div>
      <p>${blog.title}</p>
         <span href="./viewBlog.html"><i class="fa-solid fa-eye"></i></span>
        <span onclick ="editBlog(this)"><i class="fa-solid fa-pen"></i></span>
        <span onclick="deleteBlog(this)"><i class="fa-solid fa-trash"></i></span>
  </div>
    `
    articleContainer.innerHTML += articleHTML
}
})
delete blog

const deleteBlog = (el) => {
    const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
    if (el.parentElement) {
        const blogId = el.parentElement.id;
        const blogIndex = blogs.findIndex(item => item.id === blogId);
        console.log(blogIndex);
        blogs.splice(blogIndex, 1);
        localStorage.setItem('blogData', JSON.stringify(blogs));
        el.parentElement.remove();
    } else {
        console.error("Parent element is undefined");
    }
}
// edit the blog

let currentTask = {};

// ...

const editBlog = (el) => {
    const blogs = JSON.parse(localStorage.getItem('blogData')) || '';

    if (el.parentElement) {
        const blogId = el.parentElement.id;
        const blogIndex = blogs.findIndex(item => item.id === blogId);

        currentTask = blogs[blogIndex];
        // console.log(currentTask);
        let contents = currentTask.description;

        blogTitle.value = currentTask.title;

        const currentImagePreview = document.getElementById('currentImagePreview');
        currentImagePreview.src = currentTask.image;
        currentImagePreview.style.display = 'block';

        const blogImage = document.getElementById('image');
        blogImage.src = currentTask.image;

        // Set the content of the TinyMCE editor
        tinymce.activeEditor.setContent(contents);

        // Show the new image input element and reset its value
        const newImageInput = document.getElementById('image');
        const updatedImage = document.getElementById('updated-img');
        const currentImage = document.getElementById('current-img');
        updatedImage.innerText = 'Updated Image';
        updatedImage.style.color = 'green';
        updatedImage.style.fontSize = '13px';
        currentImage.innerText = 'Current Image';
        currentImage.style.fontSize = '13px';
        newImageInput.style.display = 'block';
        newImageInput.value = '';

        // Hide the new image preview initially
        const newImagePreview = document.getElementById('newImagePreview');
        newImagePreview.style.display = 'none';

        saveBlog.innerText = 'Update Blog';
        FormAdd.classList.toggle('pop-edit');

        // Check if a new image is already selected and preview it
        if (newImageInput.files.length > 0) {
            previewNewImage(newImageInput);
        }
    }
};



const updateBlog = () => {
    const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
    const blogId = currentTask.id;
    const blogIndex = blogs.findIndex(item => item.id === blogId);

    // Update the existing blog with the edited content
    blogs[blogIndex].title = blogTitle.value;

    // Check if a new image is selected
    const newImageInput = document.getElementById('image');
    const newImagePreview = document.getElementById('newImagePreview');

    if (newImageInput.files.length > 0) {
        const selectedImage = newImageInput.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(selectedImage);

        reader.onload = function () {
            const imageDataURL = reader.result;

            // Show the preview of the new image    
            newImagePreview.src = imageDataURL;
            newImagePreview.style.display = 'block';

            blogs[blogIndex].image = imageDataURL;

            // Save the updated blogData to localStorage
            localStorage.setItem('blogData', JSON.stringify(blogs));

           
            alert('Blog updated successfully');
        };
    } else {
        localStorage.setItem('blogData', JSON.stringify(blogs));
        alert('Blog updated successfully');
    }
};
// Add this function to your script
const previewNewImage = (input) => {
    const newImagePreview = document.getElementById('newImagePreview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Show the preview of the selected new image
            newImagePreview.src = e.target.result;
            newImagePreview.style.display = 'block';
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        // Hide the new image preview if no file is selected
        newImagePreview.style.display = 'none';
    }
};

const closeForm= ()  => {
    const form = document.getElementById('form');
    form.style.display = 'none'; 
}

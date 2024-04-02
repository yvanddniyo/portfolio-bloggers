const articleContainer = document.getElementById('container-article')
const saveBlog = document.getElementById('save')
const FormAdd = document.getElementById('form')
const formContainer = document.getElementById('form')
const blogTitle = document.getElementById('title')
const blogImage = document.getElementById('image')
const blogDescription = document.getElementById('content')
const blogSave = document.getElementById('send')
const token = localStorage.getItem('auth-token')
const blogLoader = document.getElementById("loader");
console.log(blogLoader);


const showPopup = (message, color, callback) => {
    const popupContainer = document.getElementById("popup-container");
    const popupMessage = document.getElementById("popup-message");
    const popupOk = document.getElementById("popup-ok");
    popupMessage.textContent = message;
    popupMessage.style.color = color;
    popupContainer.style.display = "block";

    popupOk.addEventListener("click", async (e) => {
        e.preventDefault();
        popupContainer.style.display = "none";

        if (callback && typeof callback === 'function') {
            await callback();
        }
    });
};


blogLoader.style.display = "block";
document.addEventListener('DOMContentLoaded', async () => {

    const updateUrl = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs`;

    try {
        const response = await fetch(updateUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        blogLoader.style.display = "none";
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        articleContainer.innerHTML = "";

        responseData.forEach(blog => {
            const articleHTML = `
                <div class="an-article" id="${blog._id}">
                    <div class="image-article">
                        <img src="${blog.image}" alt="blog">
                    </div>
                    <p>${blog.title}</p>
                    <span onclick="editBlog(this)">
                      <i class="fa-solid fa-pen"></i>
                    </span>
                    <span onclick="deleteBlog(this)">
                     <i class="fa-solid fa-trash">
                    </i></span>
                </div>
            `;
            articleContainer.innerHTML += articleHTML;
        });
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
    }
});


const deleteBlog = async (element) => {
    const blogId = element.parentNode.id;

    try {
        showPopup(
            "You're about to delete this blog, are you sure ?",
            "#F48B2A",
            async () => {
                const deleteUrl = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}`;
                console.log(blogId);
                const response = await fetch(deleteUrl, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });

                if (response.ok) {
                    element.parentNode.remove();
                }
            }
        );
    } catch (error) {
        console.error('Error deleting the blog:', error);
    }
}



const editBlog = async (element) => {
    try {
        if (!element || !element.parentNode) {
            console.error('Invalid element or parent node');
            return;
        }

        const blogId = element.parentNode.id;
        const updateUrl = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}`;

        console.log(blogId);

        const response = await fetch(updateUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the blog data');
        }

        const blog = await response.json();

        blogTitle.value = blog.title;
        tinymce.get('content').setContent(blog.content);
        FormAdd.style.display = 'block';

        FormAdd.addEventListener('submit', async (event) => {
            event.preventDefault();

            const titleInputs = blogTitle.value;
            const textDescriptions = tinymce.get('content').getContent();
            const formData = new FormData();

            formData.append('title', titleInputs);
            formData.append('content', textDescriptions);

            // Check if new image file is selected
            if (blogImage.files.length > 0) {
                formData.append('image', blogImage.files[0]);
            }

            blogSave.textContent = "Updating...";

            const updateResponse = await fetch(updateUrl, {
                method: 'PATCH',
                headers: {
                    'auth-token': token
                },
                body: formData
            });

            if (!updateResponse.ok) {
                throw new Error('Failed to update the blog');
            }

            showPopup('Blog updated successfully', '#4CAF50', () => {
                // window.location.reload();
            });
        });

    } catch (error) {
        console.error('Error fetching or updating the blog:', error);
        showPopup('An error occurred. Please try again later.', '#F44336');
    }

    blogSave.innerText = "Update Blog";
    return FormAdd.classList.toggle('pop-edit');
};


// delete blog

// const deleteBlog = (el) => {
//     const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
//     if (el.parentElement) {
//         const blogId = el.parentElement.id;
//         const blogIndex = blogs.findIndex(item => item.id === blogId);
//         console.log(blogIndex);
//         blogs.splice(blogIndex, 1);
//         localStorage.setItem('blogData', JSON.stringify(blogs));
//         el.parentElement.remove();
//     } else {
//         console.error("Parent element is undefined");
//     }
// }
// edit the blog

// let currentTask = {};

// ...

// const editBlog = (el) => {
//     const blogs = JSON.parse(localStorage.getItem('blogData')) || '';

//     if (el.parentElement) {
//         const blogId = el.parentElement.id;
//         const blogIndex = blogs.findIndex(item => item.id === blogId);

//         currentTask = blogs[blogIndex];
//         // console.log(currentTask);
//         let contents = currentTask.description;

//         blogTitle.value = currentTask.title;

//         const currentImagePreview = document.getElementById('currentImagePreview');
//         currentImagePreview.src = currentTask.image;
//         currentImagePreview.style.display = 'block';

//         const blogImage = document.getElementById('image');
//         blogImage.src = currentTask.image;

//         // Set the content of the TinyMCE editor
//         tinymce.activeEditor.setContent(contents);

//         // Show the new image input element and reset its value
//         const newImageInput = document.getElementById('image');
//         const updatedImage = document.getElementById('updated-img');
//         const currentImage = document.getElementById('current-img');
//         updatedImage.innerText = 'Updated Image';
//         updatedImage.style.color = 'green';
//         updatedImage.style.fontSize = '13px';
//         currentImage.innerText = 'Current Image';
//         currentImage.style.fontSize = '13px';
//         newImageInput.style.display = 'block';
//         newImageInput.value = '';

//         // Hide the new image preview initially
//         const newImagePreview = document.getElementById('newImagePreview');
//         newImagePreview.style.display = 'none';

//         saveBlog.innerText = 'Update Blog';
//         FormAdd.classList.toggle('pop-edit');

//         // Check if a new image is already selected and preview it
//         if (newImageInput.files.length > 0) {
//             previewNewImage(newImageInput);
//         }
//     }
// };

const closeForm = () => {
    const form = document.getElementById('form');
    form.style.display = 'none';
}

// const updateBlog = () => {
//     const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
//     const blogId = currentTask.id;
//     const blogIndex = blogs.findIndex(item => item.id === blogId);

//     // Update the existing blog with the edited content
//     blogs[blogIndex].title = blogTitle.value;
//     blogs[blogIndex].description = tinymce.get('content').getContent();



//     // Check if a new image is selected
//     const newImageInput = document.getElementById('image');
//     const newImagePreview = document.getElementById('newImagePreview');

//     if (newImageInput.files.length > 0) {
//         const selectedImage = newImageInput.files[0];
//         const reader = new FileReader();

//         reader.readAsDataURL(selectedImage);

//         reader.onload = function () {
//             const imageDataURL = reader.result;

//             // Show the preview of the new image
//             newImagePreview.src = imageDataURL;
//             newImagePreview.style.display = 'block';

//             blogs[blogIndex].image = imageDataURL;

//             // Save the updated blogData to localStorage
//             localStorage.setItem('blogData', JSON.stringify(blogs));


//             alert('Blog updated successfully');
//         };
//     } else {
//         localStorage.setItem('blogData', JSON.stringify(blogs));
//         alert('Blog updated successfully');
//     }
// };
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



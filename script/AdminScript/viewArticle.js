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
                    <span onclick="handleEditButtonClick(this)">
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



const toggleEditForm = () => {
    FormAdd.classList.toggle('pop-edit');
};

const openEditForm = () => {
    FormAdd.classList.add('pop-edit');
};
const closeEditForm = () => {
    FormAdd.classList.remove('pop-edit');
};

const editBlog = async (element) => {
    try {
        if (!element || !element.parentNode) {
            console.error('Invalid element or parent node');
            return;
        }

        openEditForm();

        const blogId = element.parentNode.id;
        const updateUrl = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}`;

        const response = await fetch(updateUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        });
        blogSave.innerText = "Update Blog";

        if (!response.ok) {
            throw new Error('Failed to fetch the blog data');
        }

        const blog = await response.json();
        blogTitle.value = blog.title;
        blogImage.file = blog.image;
        tinymce.get('content').setContent(blog.content);

        FormAdd.addEventListener('submit', async (event) => {
            event.preventDefault();

            const titleInputs = blogTitle.value;
            const blogImages = blogImage.file[0];
            const textDescriptions = tinymce.get('content').getContent();
            const formData = new FormData();
            formData.append('title', titleInputs);
            formData.append('image', blogImages)
            formData.append('content', textDescriptions);

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
            });
            blogSave.innerText = "Update Blog";
            blogSave.disabled = false;
        });

    } catch (error) {
        console.error('Error fetching or updating the blog:', error);
        showPopup('An error occurred. Please try again later.', '#F44336');
    }
};

const handleEditButtonClick = (element) => {
    editBlog(element);
    toggleEditForm();
};

const closeForm = () => {
    const form = document.getElementById('form');
    form.style.display = 'none';
}

const previewNewImage = (input) => {
    const newImagePreview = document.getElementById('newImagePreview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            newImagePreview.src = e.target.result;
            newImagePreview.style.display = 'block';
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        newImagePreview.style.display = 'none';
    }
};




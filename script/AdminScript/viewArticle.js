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

// delete blog

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

const editBlog = (el) => {
    const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
   

    if (el.parentElement) {
        
        const blogId = el.parentElement.id;
        const blogIndex = blogs.findIndex(item => item.id === blogId);

        currentTask = blogs[blogIndex];
        let contents = currentTask.description;

        blogTitle.value = currentTask.title;

        const blogImage = document.getElementById('image');
        blogImage.src = currentTask.image;

        tinymce.get('content').setContent(contents);

        saveBlog.innerText = 'Update Blog';
        FormAdd.classList.toggle('pop-edit');
    }
};


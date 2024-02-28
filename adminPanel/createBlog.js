const formContainer = document.getElementById('form')
const blogTitle = document.getElementById('title')
const blogImage= document.getElementById('image')
const blogDescription= document.getElementById('content')
const blogSave= document.getElementById('save')


const saveLocalStorage = () => {
    const blogData = JSON.parse(localStorage.getItem('blogData')) || [];

    if (blogImage.files.length > 0) {
      const selectedImage = blogImage.files[0];

      const reader = new FileReader();

      reader.readAsDataURL(selectedImage);

      reader.onload = function () {
        const imageDataURL = reader.result;

        const specificDate = new Date(); 
        const year = specificDate.getFullYear();
        const month = specificDate.getMonth() + 1;
        const day = specificDate.getDate();

        const newBlog = {
          title: blogTitle.value,
          image: imageDataURL,
          description: tinymce.get('content').getContent(),
          comment: 0,
          likes: 0,
          year: year,
          month: month,
          day: day
        };

        blogData.push(newBlog);
        localStorage.setItem('blogData', JSON.stringify(blogData));

        // alert('Blog submitted successfully');
      };
    } else {
      // alert('Please select an image first.');
    }
  };




// function submitBlog() {
//     const title = document.getElementById('title').value;
//     const content = document.getElementById('content').value;
  
//     // Get existing blogs from localStorage or initialize an empty array
//     const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
  
//     // Add the new blog
//     const newBlog = { title, content };
//     existingBlogs.push(newBlog);
  
//     // Save the updated blogs to localStorage
//     localStorage.setItem('blogs', JSON.stringify(existingBlogs));
  
//     alert('Blog submitted successfully!');
//   }
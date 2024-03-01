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

        const currentTimestamp = new Date().getTime(); 
        const formattedTimestamp = new Date(currentTimestamp).toLocaleString();

        const newBlog = {
          id: `${blogTitle.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
          title: blogTitle.value,
          image: imageDataURL,
          description: tinymce.get('content').getContent(),
          comment: 0,
          likes: 0,
          date: formattedTimestamp
        };

        blogData.push(newBlog);
        localStorage.setItem('blogData', JSON.stringify(blogData));

        alert('Blog submitted successfully');
      };
    } 
  };
  

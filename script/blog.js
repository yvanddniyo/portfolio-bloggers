const blogContainer = document.getElementById('blog-container')
document.addEventListener('DOMContentLoaded', () => {
blogContainer.innerHTML = "";
const blogs = JSON.parse(localStorage.getItem('blogData')) || [];


for (let i = 0; i < blogs.length && i < 20; i++) {
  const blog = blogs[i];
  localStorage.setItem(`blog_${blog.id}`, JSON.stringify(blog));
  const commentStoreKey = `commentStore_${blog.id}`;
        const commentStore = JSON.parse(localStorage.getItem(commentStoreKey)) || [];
      const blogHTML =`
    <div class="line-btn"></div>
    <div class="photo-container-blog">
        <div class="photo-blog">
            <img id="blog-img" src=${blog.image} alt="blogs">
        </div>
        <div class="main-content-blog">
            <h3 id="title-blog">${blog.title}</h3>
            <p id="content-blog">${blog.description.length > 100? blog.description.slice(0, 100)+'...' : blog.description}</p>
                <div class="more-info">
                   <p><a href="./article.html?id=${blog.id}">Read more >></a></p> 
                    <div class="likes-comments" id=${blog.id}>
                  <button id="like-btn" onclick="likeBlogs(this, '${blog.id}')">
                        <i class="fa-solid fa-heart"></i> 
                      </button>
                       <span id="likes_${blog.id}">${blog.likes}</span>
                      <button id="comment-button" onclick="commentCount(this)">
                      <i class="fa-solid fa-comment"></i>  
                      </button>
                      <span id="comments">${commentStore.length}</span>
                    </div>
                 </div>
                
                <div class="info-blog">
                   <p class="web-dev">Web developer</p> 
                   <p class="author"> Text: <span>Yvan</span></p>
                   <p class="date-blog">${blog.date}</p>
                   <p class="read-time">1 min ago</p>
                </div>
        </div>
    `
    // console.log(blog.id);
    blogContainer.innerHTML += blogHTML 
}
})


const likeBlogs = (el, blogId, userId) => {
  const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
  const userLikedBlogs = JSON.parse(localStorage.getItem(`likedBlogs_${userId}`)) || [];

  const blogIndex = blogs.findIndex(blog => blog.id === blogId);

  if (blogIndex !== -1) {
    if (!userLikedBlogs.includes(blogId)) {
      // Blog is not liked by the user, increase like count
      blogs[blogIndex].likes = (blogs[blogIndex].likes || 0) + 1;
      userLikedBlogs.push(blogId);
    } else {
      // Blog is already liked by the user, decrease like count
      blogs[blogIndex].likes = Math.max((blogs[blogIndex].likes || 0) - 1, 0);
      userLikedBlogs.splice(userLikedBlogs.indexOf(blogId), 1);
    }

    localStorage.setItem('blogData', JSON.stringify(blogs));
    localStorage.setItem(`likedBlogs_${userId}`, JSON.stringify(userLikedBlogs));

    // Update the likes for the clicked blog
    const likesSpan = document.getElementById(`likes_${blogId}`);
    if (likesSpan) {
      likesSpan.textContent = blogs[blogIndex].likes;
    } else {
      console.log(`Likes span not found for blog ${blogId}.`);
    }
  } else {
    console.log(`Blog with ID ${blogId} not found.`);
  }
};




const loginUser = JSON.parse(localStorage.getItem('loggedInUser')) || [];
const loginUserName = document.getElementById("login-user-name");
loginUserName.innerText = `${loginUser.username}`; 
console.log(loginUser);

const handleDropdownChange = () => {
  const userDropdown = document.getElementById("user-dropdown");
  
  // Check if the selected option is the "Log Out" option
  if (userDropdown.value === "users-logged") {
      logout(); 
  }
};

const logout = () => {
  const loginUserName = document.getElementById("login-user-name");
  if (localStorage.removeItem('loggedInUser')) {
    window.location.href = '../Html/index.html';
  }else {
    loginUserName.innerText = 'No User';
  }
};


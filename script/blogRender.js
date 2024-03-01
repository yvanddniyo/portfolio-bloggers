const blogContainer = document.getElementById('blog-container')
document.addEventListener('DOMContentLoaded', () => {
blogContainer.innerHTML = "";
const blogs = JSON.parse(localStorage.getItem('blogData')) || [];

for (let i = 0; i < blogs.length && i < 2; i++) {
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
                      <button id="like-btn" onclick="likeBlogs(this)">
                        <i class="fa-solid fa-heart"></i> 
                      </button>
                      <span id="likes">${blog.likes}</span>
                      <button id="comment-button" onclick="commentCount(this)">
                      <i class="fa-solid fa-comment"></i>  
                      </button>
                      <span id="comments" >${commentStore.length}</span>
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


const likeBlogs = (el) => {
  const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
  const likedBlogs = JSON.parse(localStorage.getItem('likedBlogs')) || [];

  const blogIndex = blogs.findIndex(blog => blog.id === el.parentElement.id);

  if (blogIndex !== -1 && !likedBlogs.includes(blogs[blogIndex].id)) {
      blogs[blogIndex].likes = (blogs[blogIndex].likes || 0) + 1;

      likedBlogs.push(blogs[blogIndex].id);
      
      localStorage.setItem('blogData', JSON.stringify(blogs));
      localStorage.setItem('likedBlogs', JSON.stringify(likedBlogs));

      const likesSpan = document.getElementById('likes');
      if (likesSpan) {
          likesSpan.textContent = blogs[blogIndex].likes;
      } else {
          console.log('Likes span not found.');
      }
  } else {
      console.log('Blog not found or already liked by the user.');
  }
};





  
  






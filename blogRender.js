const blogContainer = document.getElementById('blog-container')
document.addEventListener('DOMContentLoaded', () => {

blogContainer.innerHTML = "";
const blogs = JSON.parse(localStorage.getItem('blogData')) || [];

for (let i = 0; i < blogs.length && i < 2; i++) {
  const blog = blogs[i];
      const blogHTML =`
    <div class="line-btn"></div>
    <div class="photo-container-blog">
        <div class="photo-blog">
            <img id="blog-img" src=${blog.image} alt="blogs">
        </div>
        <div class="main-content-blog">
            <h3 id="title-blog">${blog.title}</h3>
            <p id="content-blog">${blog.description.length > 100? blog.description.slice(0, 100) +'...' : blog.description}</p>
                <div class="more-info">
                   <p><a href="./article.html">Read more >></a></p> 
                    <div class="likes-comments">
                      <a href="#">
                        <i class="fa-solid fa-heart"></i> 
                      </a>
                      <span>${blog.comment}</span>
                      <a href="#">
                      <i class="fa-solid fa-comment"></i>  
                      </a>
                      <span>${blog.likes}</span>
                    </div>
                 </div>
                
                <div class="info-blog">
                   <p class="web-dev">Web developer</p> 
                   <p class="author"> Text: <span>Yvan</span></p>
                   <p class="date-blog">${blog.year}.0${blog.month}.${blog.day}</p>
                   <p class="read-time">1 min ago</p>
                </div>
        </div>
    `
    blogContainer.innerHTML += blogHTML 
  
}
})




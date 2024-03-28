window.addEventListener('DOMContentLoaded', () => {
    const blogLoader = document.getElementById('loader')
    const articleContainer = document.getElementById('main-article');
    
    blogLoader.style.display = "block"
    const getBlogById = async () => {
        const blogId = new URLSearchParams(window.location.search).get('id')
        await fetch(`https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}`)
        .then(res => res.json())    
        .then(singleBlog => {
        blogLoader.style.display = "none"
        
        articleContainer.innerHTML =`
        <div class="container-article-title">
        <h2>${singleBlog.title}</h2>
    </div>
    <div class="line-article"></div>
    <div class="info-article">
        <p class="web-dev">Web developer</p>
        <p class="author"> Text: <span>Yvan</span></p>
        <p class="date-blog">
        ${new Date(singleBlog.updatedAt).toLocaleString()}
        </p>
        <p class="read-time">Read 1min ago</p>
    </div>
    <div class="line-article-bottom"></div>
    <div class="container-full-article">
        <div class="img-article">
            <img src=${singleBlog.image} alt="article">
        </div>
        <div class="more-info">
            <span><i class="fa-solid fa-heart"></i></span>
            <a href="#comments">
                <span><i class="fa-solid fa-comment"></i></span>
            </a>
        </div>
        <div class="text-container"
        style ="margin: 1.5rem 0px;"
        >
        ${singleBlog.content}
        </div>
    </div>
    <div class="references">
        <p>web development</p>
        <p>web developer Job</p>
        <p>Full-stack development</p>
    </div>
        `
    
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        }); 
    }
    getBlogById()
})
  
  
  //saving the comment in the LocalStorage.

const textareainput = document.getElementById('message')
const sectionComment = document.getElementById('comment-section')
const submitButton = document.getElementById("send");
const commentsContainer = document.getElementById('form');
const usernameInput = document.getElementById('client-name');
const nameErrors = document.querySelector('.text-error');
const messageErrors = document.querySelector('.message-err');

commentsContainer.addEventListener('submit', (e) => {
    if (usernameInput.value === "" || usernameInput.value === null) {
        e.preventDefault();
            nameErrors.innerText = "Please fill in the name and content.";
        
            nameErrors.innerText = "";
            e.preventDefault();
    }
     else {
        usernameInput.value = '';
        e.preventDefault();
    }
    if (sectionComment.value === "" || sectionComment.value === null) {
            e.preventDefault();
            messageErrors.innerText = "Please fill in the name and content.";
       
        } else {
            textareainput.value ="";
            sectionComment.value = '';
            messageErrors.innerText = "";
    }
});




// Adding independent blog read

//   const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
//   const urlParams = new URLSearchParams(window.location.search);
//   const blogId = urlParams.get('id');
//   const blog = JSON.parse(localStorage.getItem(`blog_${blogId}`));
//   const commentStoreKey = `commentStore_${blogId}`;
//   const commentStore = JSON.parse(localStorage.getItem(commentStoreKey)) || [];

//  if (blogId) {
//     if (blog) {
//         const articleContainer = document.getElementById('main-article');
//         articleContainer.innerHTML = `
//             <div class="container-article-title">
//                 <h2>${blog.title}</h2>
//             </div>
//             <div class="line-article"></div>
//             <div class="info-article">
//                 <p class="web-dev">Web developer</p>
//                 <p class="author"> Text: <span>Yvan</span></p>
//                 <p class="date-blog">${blog.date}</p>
//                 <p class="read-time">Read 1min ago</p>
//             </div>
//             <div class="line-article-bottom"></div>
//             <div class="container-full-article">
//                 <div class="img-article">
//                     <img src=${blog.image} alt="article">
//                 </div>
//                 <div class="more-info">
//                     <span><i class="fa-solid fa-heart"></i>${blog.likes}</span>
//                     <a href="#comments">
//                         <span><i class="fa-solid fa-comment"></i> ${commentStore.length}</span>
//                     </a>
//                 </div>
//                 <div class="text-container">${blog.description}</div>
//             </div>
//             <div class="references">
//                 <p>web development</p>
//                 <p>web developer Job</p>
//                 <p>Full-stack development</p>
//             </div>
//         `;
//     } else {
//         console.error(`Blog with id ${blogId} not found`);
//     }
// } else {
//     console.error('Blog id not provided in the URL');
// }
// const addComments = (blogId) => {
//     const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
//     const commentStoreKey = `commentStore_${blogId}`;
//     const commentStore = JSON.parse(localStorage.getItem(commentStoreKey)) || [];
//     const currentTimestamp = new Date().getTime();
//     const formattedTimestamp = new Date(currentTimestamp).toLocaleString();

//     const commentsObj = {
//         blogId: blogId,
//         visitor: usernameInput.value,
//         message: textareainput.value,
//         date: formattedTimestamp
//     };

//     if (usernameInput === "" || textareainput.value === "") {
//         alert('please insert name and message');
//     } else {
//         commentStore.push(commentsObj);
//         localStorage.setItem(commentStoreKey, JSON.stringify(commentStore));

//         // Update the DOM immediately after adding a new comment
//         updateCommentsUI(blogId);
//     }
// };

// const updateCommentsUI = (blogId) => {
//     const commentStoreKey = `commentStore_${blogId}`;
//     const commentStore = JSON.parse(localStorage.getItem(commentStoreKey)) || [];
//     const blogComment = commentStore.filter(comment => comment.blogId === blogId);

//     sectionComment.innerHTML = "";

//     blogComment.forEach(comment => {
//         const commentsHTML = `
//             <div class="comments">
//                 <div class="comment-user">
//                     <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="">
//                 </div>
//                 <div class="user-comments">
//                     <h3>${comment.visitor}</h3>
//                     <p class="data">${comment.date}</p>
//                     <p>${comment.message}</p>
//                 </div>
//             </div>
//         `;

//         sectionComment.innerHTML += commentsHTML;
//     });
// };

// document.addEventListener('DOMContentLoaded', () => {
//     sectionComment.innerHTML = "";
//     updateCommentsUI(blogId);
// });






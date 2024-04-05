// document.addEventListener("DOMContentLoaded", () => {
//   const blogContainer = document.getElementById('blog-container');
//   const getLoader = document.getElementById("loader");
//   blogContainer.innerHTML = "";

//   let startBlog = 0;
//   let endBlog = 9;

//   getLoader.style.display = "block";

//   fetch('https://be-portofolio-bloger-2.onrender.com/api/v1/blogs')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network issue');
//       }
//       return response.json();
//     })
//     .then(async blogs => {
//       console.log(blogs);

//       getLoader.style.display = "none";

//       for (let i = startBlog; i < endBlog; i++) {
//         const blog = blogs[i];
//         const blogId = blog._id;

//         const commentCount = await fetchCommentCount(blogId);
//         const likeCount = await fetchLikeCount(blogId);

//         const blogHTML = `
//           <div class="line-btn"></div>
//           <div class="photo-container-blog">
//               <div class="photo-blog">
//                   <img id="blog-img" src=${blog.image} alt="blogs">
//               </div>
//               <div class="main-content-blog">
//                   <h3 id="title-blog">${blog.title}</h3>
//                   <p id="content-blog">${blog.content.length > 100 ? blog.content.slice(0, 100) + ' . . . ' : blog.content}</p>
//                     <div class="more-info">
//                         <p><a href="../Html/article.html?id=${blogId}">Read more >></a></p> 
//                         <div class="likes-comments" id=${blog.id}>
//                           <button id="like-btn" onclick="likeBlogs(this)">
//                             <i class="fa-solid fa-heart"></i> 
//                             <span>${likeCount}</span> <!-- Display like count -->
//                           </button>
//                           <button id="comment-button" onclick="commentCount(this)">
//                             <i class="fa-solid fa-comment"></i>  
//                             <span>${commentCount}</span> <!-- Display comment count -->
//                           </button>
//                         </div>
//                     </div>
                      
//                     <div class="info-blog">
//                         <p class="web-dev">Web developer</p> 
//                         <p class="author"> Text: <span>Yvan</span></p>
//                         <p class="date-blog" style="font-size: 10px">${new Date(blog.updatedAt).toLocaleString()}</p>
//                         <p class="read-time">1 min ago</p>
//                     </div>
//               </div>
//           </div>
//         `;
//         blogContainer.innerHTML += blogHTML;
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// })


// const fetchCommentCount = async (blogId) => {
//   try {
//     const response = await fetch(`https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/comments`);
//     const comments = await response.json();
//     return comments.length;
//   } catch (error) {
//     console.error('Error fetching comment count:', error);
//     return 0;
//   }
// }

// const fetchLikeCount = async (blogId) => {
//   try {
//     const response = await fetch(`https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/likes`);
//     const likes = await response.json();
//     return likes.data.likesCount
//   } catch (error) {
//     console.error('Error fetching like count:', error);
//     return 0;
//   }
// }

// let token = localStorage.getItem('auth-token');

// const decodeJWT = (token) => {
//   const parts = token.split(".");
//   const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
//   return { payload };
// };

// let decodedToken, userRole;

// if (token) {
//   decodedToken = decodeJWT(token);
//   userRole = decodedToken.payload.username;
// }

// const logOut = () => {
//   localStorage.removeItem('auth-token');
//   const userOption = document.getElementById('user-option');
//   userOption.textContent = '';
// }

// const handleLogOut = (selectElement) => {
//   const userOption = document.getElementById('user-option');

//   if (selectElement.value === 'logout') {
//     logOut();
//   } else if (selectElement.value === 'user') {
//     if (token) {
//       userOption.textContent = userRole;
//     } else {
//       userOption.textContent = "No logged";
//     }
//   }
// }

// const userOption = document.getElementById('user-option'); 

// if (token) {
//   userOption.textContent = userRole;
// } else {
//   userOption.textContent = "No logged";
// }

// // const blogs = JSON.parse(localStorage.getItem('blogData')) || [];


// // for (let i = 0; i < blogs.length && i < 20; i++) {
// //   const blog = blogs[i];
// //   localStorage.setItem(`blog_${blog.id}`, JSON.stringify(blog));
// //   const commentStoreKey = `commentStore_${blog.id}`;
// //         const commentStore = JSON.parse(localStorage.getItem(commentStoreKey)) || [];
// //       const blogHTML =`
// //     <div class="line-btn"></div>
// //     <div class="photo-container-blog">
// //         <div class="photo-blog">
// //             <img id="blog-img" src=${blog.image} alt="blogs">
// //         </div>
// //         <div class="main-content-blog">
// //             <h3 id="title-blog">${blog.title}</h3>
// //             <p id="content-blog">${blog.description.length > 100? blog.description.slice(0, 100)+'...' : blog.description}</p>
// //                 <div class="more-info">
// //                    <p><a href="./article.html?id=${blog.id}">Read more >></a></p> 
// //                     <div class="likes-comments" id=${blog.id}>
// //                   <button id="like-btn" onclick="likeBlogs(this, '${blog.id}')">
// //                         <i class="fa-solid fa-heart"></i> 
// //                       </button>
// //                        <span id="likes_${blog.id}">${blog.likes}</span>
// //                       <button id="comment-button" onclick="commentCount(this)">
// //                       <i class="fa-solid fa-comment"></i>  
// //                       </button>
// //                       <span id="comments">${commentStore.length}</span>
// //                     </div>
// //                  </div>
                
// //                 <div class="info-blog">
// //                    <p class="web-dev">Web developer</p> 
// //                    <p class="author"> Text: <span>Yvan</span></p>
// //                    <p class="date-blog">${blog.date}</p>
// //                    <p class="read-time">1 min ago</p>
// //                 </div>
// //         </div>
// //     `
// //     blogContainer.innerHTML += blogHTML 
// // }
// // })


// // const likeBlogs = (el, blogId, userId) => {
// //   const blogs = JSON.parse(localStorage.getItem('blogData')) || [];
// //   const userLikedBlogs = JSON.parse(localStorage.getItem(`likedBlogs_${userId}`)) || [];

// //   const blogIndex = blogs.findIndex(blog => blog.id === blogId);

// //   if (blogIndex !== -1) {
// //     if (!userLikedBlogs.includes(blogId)) {
// //       blogs[blogIndex].likes = (blogs[blogIndex].likes || 0) + 1;
// //       userLikedBlogs.push(blogId);
// //     } else {
// //       blogs[blogIndex].likes = Math.max((blogs[blogIndex].likes || 0) - 1, 0);
// //       userLikedBlogs.splice(userLikedBlogs.indexOf(blogId), 1);
// //     }

// //     localStorage.setItem('blogData', JSON.stringify(blogs));
// //     localStorage.setItem(`likedBlogs_${userId}`, JSON.stringify(userLikedBlogs));

// //     const likesSpan = document.getElementById(`likes_${blogId}`);
// //     if (likesSpan) {
// //       likesSpan.textContent = blogs[blogIndex].likes;
// //     } 
// //   } 
// // };




// // const loginUser = JSON.parse(localStorage.getItem('loggedInUser')) || [];
// // const loginUserName = document.getElementById("login-user-name");
// // loginUserName.innerText = `${loginUser.username}`; 
// // console.log(loginUser);

// // const handleDropdownChange = () => {
// //   const userDropdown = document.getElementById("user-dropdown");
  
// //   // Check if the selected option is the "Log Out" option
// //   if (userDropdown.value === "users-logged") {
// //       logout(); 
// //   }
// // };

// // const logout = () => {
// //   const loginUserName = document.getElementById("login-user-name");
// //   if (localStorage.removeItem('loggedInUser')) {
// //     window.location.href = '../Html/index.html';
// //   }else {
// //     loginUserName.innerText = 'No User';
// //   }
// // };


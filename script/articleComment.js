const textareainput = document.getElementById("message");
const sectionComment = document.getElementById("comment-section");
const submitButton = document.getElementById("send");
const commentsContainer = document.getElementById("form");
const usernameInput = document.getElementById("client-name");
const nameErrors = document.querySelector(".text-error");
const messageErrors = document.querySelector(".message-err");
const commentC = document.querySelector(".fa-comment");
const likeBlogButton = document.getElementById("get-blog");
const signup = document.getElementById("sign-up");
const blogLoader = document.getElementById("loader");


let numberLikes;

const decodeJWT = (token) => {
  const parts = token.split(".");
  const payload = JSON.parse(
    atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
  );
  return { payload };
};

//  showing the pop up message

const showPopup = (message, color, redirectUrl = null) => {
  const popupContainer = document.getElementById("popup-container");
  const popupMessage = document.getElementById("popup-message");
  const popupOk = document.getElementById("popup-ok");
  console.log(popupOk);
  popupMessage.textContent = message;
  popupMessage.style.color = color;
  popupContainer.style.display = "block";

  popupOk.addEventListener("click", (e) => {
    e.preventDefault();
    popupContainer.style.display = "none";

    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  });
};

const urlParams = new URLSearchParams(window.location.search);
const globalBlogId = urlParams.get("id");
const token = localStorage.getItem("auth-token");

const urlLike = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${globalBlogId}/likes`;

const likeBlog = async () => {
  try {
    const response = await fetch(urlLike, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (response.ok) {
      const updatedResponse = await fetch(urlLike);
      const updatedData = await updatedResponse.json();
      numberLikes = updatedData.data.likesCount;

      const likeCountElement = document.getElementById("numLike");
      const heartIcon = document.getElementById("heart");

      if (response.status === 200) {
        const likeAction = (heartIcon.style.color = "red");
        localStorage.getItem("likeItem", likeAction);
      } else {
        heartIcon.style.color = "green";
        localStorage.getItem("likedBlog");
      }
      console.log(heartIcon);
      likeCountElement.textContent = `${numberLikes}`;
    } else {
      showPopup(
        "Hmm... You do not have account. Please log in",
        "#F48B2A",
        "./login.html"
      );
      console.log("fail");
    }
  } catch (error) {
    console.error("Error in liking :", error);
  }
};

/* Get the like Buttton*/

const likeCount = async () => {
  try {
    const response = await fetch(urlLike);
    let data = await response.json();
    numberLikes = data.data.likesCount;
  } catch (error) {
    console.error("Error in liking :", error);
  }
};
likeCount();

let commentsCounter;
blogLoader.style.display = "block";

const getComments = async (commentId) => {
  const getResponse = await fetch(
    `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${commentId}/comments`
  );
  const comments = await getResponse.json();
  blogLoader.style.display = "none";

  commentsCounter = comments.length;
  sectionComment.innerHTML = "";
  comments.forEach((comment) => {
    const commentsHTML = `
      <div class="comments">
        <div class="comment-user">
          <img src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg" alt="">
        </div>
        <div class="user-comments">
          <h3>${comment.name}</h3>
          <p class="data">${new Date(comment.updatedAt).toLocaleString()}</p>
          <p>${comment.content}</p>
        </div>
      </div>
    `;
    sectionComment.innerHTML += commentsHTML;
  });
  return commentsCounter;
};

const articleContainer = document.getElementById("main-article");

let blogIdComment;

blogLoader.style.display = "block";

const getBlogById = async () => {
  const blogId = new URLSearchParams(window.location.search).get("id");
  await fetch(
    `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}`
  )
    .then((res) => res.json())
    .then(async (singleBlog) => {
      blogLoader.style.display = "none";
      blogIdComment = singleBlog._id;
      const commentsLength = await getComments(blogId);
      articleContainer.innerHTML = `
        <div class="container-article-title">
          <h2>${singleBlog.title}</h2>
        </div>
        <div class="line-article"></div>
        <div class="info-article">
          <p class="web-dev">Web developer</p>
          <p class="author"> Text: <span>Yvan</span></p>
          <p class="date-blog">${new Date(
        singleBlog.updatedAt
      ).toLocaleString()}</p>
          <p class="read-time">Read 1min ago</p>
        </div>
        <div class="line-article-bottom"></div>
        <div class="container-full-article">
          <div class="img-article">
            <img src=${singleBlog.image} alt="article">
          </div>
          <div class="more-info">
           <span style="color: white;"> 
            <i onclick="likeBlog()"class="fa-solid fa-heart" id="heart">
            </i> 
            <span id="numLike" style="color: white;">
            ${numberLikes}
            </span>
           </span>
            <a href="#comments" style="margin-right: 45px;">
              <span style="color: white; margin-left: 3px;"><i class="fa-solid fa-comment"></i>
              <span id="num-comment" style="color: white;">${commentsLength}</span>
              </span>
            </a>
          </div>
          <div class="text-container" style="margin: 1.5rem 0px;">
            ${singleBlog.content}
          </div>
        </div>
        <div class="references">
          <p>web development</p>
          <p>web developer Job</p>
          <p>Full-stack development</p>
        </div>

        <form id="form" class="leave-a-comment">
        <h4>Leave a comment</h4>
        <textarea name="content" id="message" cols="30" rows="10" placeholder="Leave us a comment"></textarea><br>
        <span class="message-err" style="font-size: 13px; color: brown;"></span>
        <span id="word-needed"></span><br>
        <button id="send" type="submit">Comment</button>
        <p style="font-size: 28px; color: #1A9718; font-weight: 600">
         Comments
        </p>
      </form>
      `;
      const textareainput = document.getElementById("message");
      const commentsContainer = document.getElementById("form");
      const signUpButton = document.getElementById("send");
      const commentLength = document.getElementById('num-comment');


      commentsContainer.addEventListener("submit", async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("auth-token");
        if (!token) {
          showPopup("Hmm... You have to log in", "#F48B2A", "./login.html");
        }

        const decodedToken = decodeJWT(token);
        const userRole = decodedToken.payload.username;

        let sectionComments = textareainput.value;

        const commentObj = {
          blogId: blogIdComment,
          name: userRole,
          content: sectionComments,
        };
        blogLoader.style.display = "block";
        signUpButton.textContent = "Loading...";
        signUpButton.disabled = true;
        const urlComments = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogIdComment}/comments`;
        try {
          console.log(token);
          console.log(blogIdComment);
          const response = await fetch(urlComments, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
            body: JSON.stringify(commentObj),
          });
          blogLoader.style.display = "none";
          if (response.ok) {
            showPopup("You have successfully commented.", "#F48B2A");
            textareainput.value = "";
            const updatedCommentsCounter = await getComments(blogIdComment);
            commentLength.textContent = updatedCommentsCounter
          } else {
            showPopup("Error occurred during commenting.", "#F48B2A");
          }
        } catch (error) {
          console.log(error);
          showPopup('An error occurred. Please try again.', '#F48B2A');
        } finally {
          signUpButton.textContent = "Comment";
          signUpButton.disabled = false;
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
getBlogById();

// let token = localStorage.getItem('auth-token');

// const decodeJWT = (token) => {
//   const parts = token.split(".");
//   const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
//   return { payload };
// };

let decodedToken, userRole;

if (token) {
  decodedToken = decodeJWT(token);
  userRole = decodedToken.payload.username;
}

const logOut = () => {
  localStorage.removeItem('auth-token');
  const userOption = document.getElementById('user-option');
  userOption.textContent = '';
}

const handleLogOut = (selectElement) => {
  const userOption = document.getElementById('user-option');

  if (selectElement.value === 'logout') {
    logOut();
  } else if (selectElement.value === 'user') {
    if (token) {
      userOption.textContent = userRole;
    } else {
      userOption.textContent = "No logged";
    }
  }
}

const userOption = document.getElementById('user-option');

if (token) {
  userOption.textContent = userRole;
} else {
  userOption.textContent = "No logged";
}



// const signUpButton = document.getElementById("send");

// commentsContainer.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const token = localStorage.getItem("auth-token");
//   if (!token) {
//     showPopup("Hmm... You have to log in", "#F48B2A", "./login.html");
//   }

//   const decodedToken = decodeJWT(token);
//   const userRole = decodedToken.payload.username;

//   let sectionComments = textareainput.value;

//   const commentObj = {
//     blogId: blogIdComment,
//     name: userRole,
//     content: sectionComments,
//   };

//   signUpButton.textContent = "Loading...";
//   signUpButton.disabled = true;
//   const urlComments = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogIdComment}/comments`;
//   try {
//     console.log(token);
//     console.log(blogIdComment);
//     const response = await fetch(urlComments, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token": token,
//       },
//       body: JSON.stringify(commentObj),
//     });
//     if (response.ok) {
//       showPopup("You have successfully commented.", "#F48B2A");
//       textareainput.value = "";
//     } else {
//       showPopup("Error occurred during commenting.", "#F48B2A");
//     }
//   } catch (error) {
//     console.log(error);
//     // showPopup('An error occurred. Please try again.', '#F48B2A');
//   } finally {
//     signUpButton.textContent = "Comment";
//     signUpButton.disabled = false;
//   }
// });
// })

//  const urlGetComment = `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogIdComment}/comments`;

// try {
//   const response = await fetch(urlGetComment);
//   const data = await response.json();

//   if (response.ok) {
//     console.log(data);
//   } else {
//     console.log('Error occurred:', response.status);
//   }
// } catch (error) {
//   console.error('Error fetching comments:', error);
// }

//saving the comment in the LocalStorage.

// commentsContainer.addEventListener('submit', (e) => {
//     e.preventDefault()
//     if (usernameInput.value === "" || usernameInput.value === null) {
//         e.preventDefault();
//             nameErrors.innerText = "Please fill in the name and content.";

//             nameErrors.innerText = "";
//             e.preventDefault();
//     }
//      else {
//         usernameInput.value = '';
//         e.preventDefault();
//     }
//     if (sectionComment.value === "" || sectionComment.value === null) {
//             e.preventDefault();
//             messageErrors.innerText = "Please fill in the name and content.";

//         } else {
//             textareainput.value ="";
//             sectionComment.value = '';
//             messageErrors.innerText = "";
//     }
// });

// })

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

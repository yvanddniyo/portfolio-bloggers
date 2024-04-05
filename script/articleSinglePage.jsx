const ArticleSinglePage = () => {
  const { useState, useEffect } = React;
  const [singleBlog, setSingleBlog] = useState(null);
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const [commentRender, setCommentRender] = useState("");
  const [commentDisplay, setCommentDisplay] = useState([]);
  const [likeStatus, setLikeStatus] = useState(false);
  const [loadingComment, setLoadingComment] = useState(false);
  const blogLoader = document.getElementById("loader");
  const token = localStorage.getItem("auth-token");

  // function that crack the token into payload
  const decodeJWT = (token) => {
    const parts = token.split(".");
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    return { payload };
  };

  const blogId = new URLSearchParams(window.location.search).get("id");
  const fetchEachArticle = async () => {
    try {
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}`
      );
      const singleBlogData = await response.json();
      setSingleBlog(singleBlogData);
      blogLoader.style.display = "none";
    } catch (error) {
      console.error("error in fetching blog :", error);
    }
  };
  const getCommentOfSinglePage = async () => {
    try {
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/comments`
      );
      const comment = await response.json();
      console.log(comment);
      setComments(comment.length);
    } catch (error) {
      console.error("error during like fetch: ", error);
    }
  };
  const getLikesOfSinglePage = async () => {
    try {
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/likes`
      );
      const likes = await response.json();
      setLikes(likes.data.likesCount);
    } catch (error) {
      console.error("error during like fetch: ", error);
    }
  };

  const checkWhoLikeOrNot = async () => {
    const userId = decodeJWT(token).payload.id;
    try {
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/likes`
      );
      const retrieveLike = await response.json();
      for (const like of retrieveLike.data.likes) {
        if (like.user === userId) {
          setLikeStatus(true);
          return;
        }
      }
      setLikeStatus(false);
    } catch (error) {
      console.error("Failed to retrive like :", error);
    }
  };

  const getAllComment = async () => {
    try {
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/comments`
      );
      const commentsArray = await response.json();
      setCommentDisplay(commentsArray);
    } catch (error) {
      console.error("failed to fetch comment:", error);
    }
  };

  const commentForBlog = async (event) => {
    if (!token) {
      Swal.fire({
        text: "You failed to comment, please log in",
        icon: "success",
        footer: '<a href="../../Html/login.html">Please Log in</a>',
      });
    }
    event.preventDefault();
    try {
      const commentObj = {
        name: decodeJWT(token).payload.name,
        content: commentRender,
      };
      setLoadingComment(true);
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
          body: JSON.stringify(commentObj),
        }
      );
      if (response.ok) {
        setCommentRender("");
        getCommentOfSinglePage();
        getAllComment();
        Swal.fire({
          text: "You successfully submitted",
          icon: "success",
          footer: '<a href="../../Html/blog.html">Click here to continue</a>',
        });
        setLoadingComment(false);
      }
    } catch (error) {
      console.error("error during commenting :", error);
    }
  };

  const likeBlog = async () => {
    if (!token) {
      Swal.fire({
        text: "You failed to like, please log in",
        icon: "success",
        footer: '<a href="../../Html/login.html">Please Log in</a>',
      });
    }
    try {
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/likes`,
        {
          method: "POST",
          headers: {
            "auth-token": token,
          },
        }
      );
      const data = await response.json();
      getLikesOfSinglePage();
      checkWhoLikeOrNot();
      console.log(data);
    } catch (err) {
      setLoadingComment(false);
      console.error("error ocurred in liking :", err);
    }
  };

  useEffect(() => {
    fetchEachArticle();
    getCommentOfSinglePage();
    getLikesOfSinglePage();
    getAllComment();
    checkWhoLikeOrNot();
  }, []);

  if (!singleBlog) {
    return false;
  }
  return (
    <>
      <div className="" id="main-article">
        <div className="container-article-title">
          <h2>{singleBlog.title}</h2>
        </div>
        <div className="line-article"></div>
        <div className="info-article">
          <p className="web-dev">Web developer</p>
          <p className="author">
            {" "}
            Text: <span>Yvan</span>
          </p>
          <p className="date-blog">
            {new Date(singleBlog.updatedAt).toLocaleString()}
          </p>
          <p className="read-time">Read 1min ago</p>
        </div>
        <div className="line-article-bottom"></div>
        <div className="container-full-article">
          <div className="img-article">
            <img src={singleBlog.image} alt="article" />
          </div>
          <div className="more-info">
            <span style={{ color: "white" }}>
              <i
                style={{ color: likeStatus ? "red" : "#22E742" }}
                onClick={likeBlog}
                className="fa-solid fa-heart"
                id="likeButton"
              ></i>
              <span id="numLike" style={{ color: "white" }}>
                {likes}
              </span>
            </span>
            <a href="#comments" style={{ marginRight: "45px" }}>
              <span style={{ color: "white", marginLeft: "3px" }}>
                <i className="fa-solid fa-comment"></i>
                <span id="num-comment" style={{ color: "white" }}>
                  {comments}
                </span>
              </span>
            </a>
          </div>
          <div className="text-container" style={{ margin: "1.5rem 0px" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: singleBlog.content,
              }}
            />
          </div>
        </div>
        <div className="references">
          <p>web development</p>
          <p>web developer Job</p>
          <p>Full-stack development</p>
        </div>
      </div>
      <form id="form" className="leave-a-comment" onSubmit={commentForBlog}>
        <h4>Leave a comment</h4>
        <textarea
          name="content"
          id="message"
          cols="30"
          rows="10"
          placeholder="Leave us a comment"
          value={commentRender}
          onChange={(event) => setCommentRender(event.target.value)}
        ></textarea>
        <br />
        <span
          className="message-err"
          style={{ fontSize: "13px", color: "brown" }}
        ></span>
        <br />
        <span id="word-needed"></span>
        <br />
        <button id="send" type="submit">
          {loadingComment ? "Loading..." : "Comment"}
        </button>
      </form>

      <div className="comments-container" id="comment-section">
        {commentDisplay.map((comment, index) => {
          return (
            <div className="comment" key={index}>
              <div className="comment-user">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  alt=""
                />
              </div>
              <div className="user-comments">
                <h3>{comment.name}</h3>
                <p className="data">
                  {new Date(comment.updatedAt).toLocaleString()}
                </p>
                <p>{comment.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

ReactDOM.render(<ArticleSinglePage />, document.getElementById("article"));

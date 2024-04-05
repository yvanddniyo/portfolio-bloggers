const Blogs = () => {
  const { useState, useEffect } = React;
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});

  const handleReadMore = (blogId) => {
    window.location.href = `../Html/article.html?id=${blogId}`;
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://be-portofolio-bloger-2.onrender.com/api/v1/blogs"
      );
      const data = await response.json();
      setBlogs(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };
  const fetchComments = async (blogId) => {
    try {
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/comments`
      );
      const comments = await response.json();
      return comments.length;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return 0;
    }
  };

  const fetchLikes = async (blogId) => {
    try {
      const response = await fetch(
        `https://be-portofolio-bloger-2.onrender.com/api/v1/blogs/${blogId}/likes`
      );
      const likes = await response.json();
      const countLikes = likes.data.likesCount;
      console.log(countLikes);
      return countLikes;
    } catch (error) {
      console.error("error occured in liking", error);
      return 0;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLikeForAllBlog = async () => {
      const likeCount = {};
      for (const blog of blogs) {
        const countLike = await fetchLikes(blog._id);
        likeCount[blog._id] = countLike;
      }
      setLikes(likeCount);
    };
    fetchLikeForAllBlog();
  }, [blogs]);

  useEffect(() => {
    const fetchCommentsForAllBlogs = async () => {
      const commentsData = {};
      for (const blog of blogs) {
        const count = await fetchComments(blog._id);
        commentsData[blog._id] = count;
      }
      setComments(commentsData);
    };
    fetchCommentsForAllBlogs();
  }, [blogs]);

  return (
    <section>
      <section id="landing-page">
        <div className="container-nav">
          <div className="container-logo">
            <img src="../assets/main Logo.png" alt="Logo" />
          </div>
          <div className="container-navbar">
            <ul className="container-navbar-lists">
              <li>
                <a href="./index.html">Home</a>
              </li>
              <li>
                <a href="">About me</a>
              </li>
              <li>
                <a href="">Skills</a>
              </li>
              <li>
                <a href="">My project</a>
              </li>
              <li>
                <a href="./blogs.html">Blogs</a>
              </li>
              <li className="signup">
                <a href="./signup.html">Sign Up</a>
              </li>
              <li className="login">
                <a href="./login.html">LogIn</a>
              </li>
              <select
                className="login-user"
                id="user-dropdown"
                onChange={(event) => handleLogOut(event.target.value)}
              >
                <option id="user-option" value="user"></option>
                <option value="logout">Log Out</option>
              </select>
            </ul>
          </div>
          <div className="menus">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
        <div className="container-blog">
          <div className="container-blog-title">
            <h1>Blogs</h1>
            <p>My thoughts on technology and business, welcome to subscribe</p>
            <h2>Subscribe My Blog</h2>
          </div>
        </div>
        {isLoading && (
          <div id="container" className="container-loader">
            <div id="loader" className="loader"></div>
          </div>
        )}
        <div className="container-main" id="blog-container">
          {blogs.map((blog, index) => {
            let blogsId = blog._id;
            return (
              <>
                <div className="line-btn"></div>
                <div key={index} className="photo-container-blog">
                  <div className="photo-blog">
                    <img id="blog-img" src={blog.image} alt="blogs" />
                  </div>
                  <div className="main-content-blog">
                    <h3 id="title-blog">{blog.title}</h3>
                    <div id="content-blog">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              blog.content.length > 100
                                ? blog.content.slice(0, 100) + " . . . "
                                : blog.content,
                          }}
                        />
                      }
                    </div>
                    <div className="more-info">
                      <p>
                        <button onClick={() => handleReadMore(blogsId)}>
                          Read more{" >>"}
                        </button>
                      </p>
                      <div className="likes-comments" id={blog.id}>
                        <button id="like-btn">
                          <span>{likes[blog._id]}</span>
                          <i className="fa-solid fa-heart"></i>
                        </button>
                        <button
                          id="comment-button"
                          //   onClick={commentCount(this)}
                        >
                          <span>{comments[blog._id]}</span>
                          <i className="fa-solid fa-comment"></i>
                        </button>
                      </div>
                    </div>

                    <div className="info-blog">
                      <p className="web-dev">Web developer</p>
                      <p className="author">
                        {" "}
                        Author: <span>Yvan</span>
                      </p>
                      <p>Date: {new Date(blog.updatedAt).toLocaleString()}</p>
                      <p className="read-time">Read: 3 min ago</p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="view-more-blog">
          <a href="#">View More Blog </a>
        </div>
      </section>
      <section id="contact">
        <section id="footer">
          <div className="container-footer">
            <div className="copyright">
              <i className="fa-solid fa-copyright"></i>
              Yvanniyonshima. all right Reserved
            </div>
            <div className="copyright">
              <a href=""> privacy and policy</a>
            </div>
            <div className="copyright">
              <a href="">Terms and Condition</a>
            </div>
            <div className="copyright">
              <a href="">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
            <div className="copyright">
              coded by<span>Yvan</span>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

ReactDOM.render(<Blogs />, document.getElementById("blog"));

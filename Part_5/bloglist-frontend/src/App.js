import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const addBlog = () => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    blogService.create(blogObject);
    setMessage(`A new blog ${title} by ${author} added`);
    setError(false);
    setTimeout(() => {
      setError(null);
      setMessage(null);
    }, 5000);
  };

  const newBlog = () => (
    <form onSubmit={addBlog}>
      <h2>New Blog</h2>
      Title:{" "}
      <input value={title} onChange={({ target }) => setTitle(target.value)} />
      <br />
      Author:{" "}
      <input
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br />
      Url: <input value={url} onChange={({ target }) => setUrl(target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} Logged In{" "}
        <button
          onClick={() => {
            window.localStorage.clear();
            setUser(null);
          }}
        >
          logout
        </button>
      </p>

      {newBlog()}
      <br />
      {blogs.map((blog) => (
        <Blog key={blogs.indexOf(blog)} blog={blog} />
      ))}
    </div>
  );
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login to the Application</h2>
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="text"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </div>
    </form>
  );
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (expection) {
      setMessage("Wrong Username or Password");
      setError(true);
      setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 5000);
    }
  };
  return (
    <div>
      <Notification error={error} message={message} />
      {user === null ? loginForm() : blogList()}
    </div>
  );
};

export default App;

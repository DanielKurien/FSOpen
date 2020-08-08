import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

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

  const addBlog = (blogObject, title, author) => {
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(blogObject));
      setMessage(`A new blog ${title} by ${author} added`);
      setError(false);
      setTimeout(() => {
        setError(null);
        setMessage(null);
      }, 5000);
    });
  };

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

      <Togglable buttonLabel="new note">
        <NewBlog createBlog={addBlog} />
      </Togglable>
      <br />
      {blogs.map((blog) => (
        <Blog key={blogs.indexOf(blog)} blog={blog} />
      ))}
    </div>
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
      {user === null ? (
        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />{" "}
        </Togglable>
      ) : (
        blogList()
      )}
    </div>
  );
};

export default App;

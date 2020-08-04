import React, { useState } from "react";
import blogService from "../services/blogs";
import Notification from "./Notification";
function NewBlog() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = () => {
    const blogObject = {
      title: title,
      author: author,
      url: url,
    };
    blogService.create(blogObject);
  };
  return (
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
}

export default NewBlog;

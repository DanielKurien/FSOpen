import React, { useState } from "react";
const Blog = ({ blog }) => {
  const [showBlog, setShowBlog] = useState(false);
  const [buttonName, setButtonName] = useState("show");
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const fullBlog = () => {
    return (
      <div>
        <p>{blog.title}</p>
        <p>{blog.url}</p>
        <p>likes {blog.likes}</p>
        <p>{blog.author}</p>
      </div>
    );
  };

  const toggleBlog = () => {
    setShowBlog(!showBlog);
    if (showBlog) {
      setButtonName("hide");
    } else {
      setButtonName("show");
    }
  };
  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={toggleBlog}>{buttonName}</button>
      {showBlog ? fullBlog() : ""}
    </div>
  );
};

export default Blog;

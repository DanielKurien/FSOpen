const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favouriteBlog = (blogs) => {
  let favouriteIndex = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > blogs[favouriteIndex].likes) {
      favouriteIndex = i;
    }
  }
  return blogs[favouriteIndex];
};

const mostBlogs = (blogs) => {
  let mostIndex = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].blogs > blogs[mostIndex].blogs) {
      mostIndex = i;
    }
  }
  return {
    author: blogs[mostIndex].author,
    blogs: blogs[mostIndex].blogs,
  };
};

const mostLikes = (blogs) => {
  let favouriteIndex = 0;
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > blogs[favouriteIndex].likes) {
      favouriteIndex = i;
    }
  }
  return {
    author: blogs[favouriteIndex].author,
    likes: blogs[favouriteIndex].likes,
  };
};
module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };

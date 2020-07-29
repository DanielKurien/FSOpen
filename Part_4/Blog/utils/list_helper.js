const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    blogs: 3,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    blogs: 6,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    blogs: 8,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    blogs: 15,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    blogs: 10,
  },
];
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
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
};

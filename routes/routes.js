const posts = require("../controllers/posts");
const login = require("../controllers/login");
const signup = require("../controllers/signup");
const users = require("../controllers/users");
const comments = require("../controllers/comments");

module.exports = app => {
  app.use("/posts", posts);
  app.use("/login", login);
  app.use("/signup", signup);
  app.use("/users", users);
  app.use("/comments", comments);
};

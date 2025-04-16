const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

//? connection
const sequelize = require("./lib/sequelize.connection");

// routers
const userRouter = require("./routes/user.route"); // user
const postRouter = require("./routes/blog.route"); // post
const commentRouter = require("./routes/comment.route"); // comment
const likeRouter = require("./routes/like.route"); // like

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log("Error while connection", error);
  });

//? middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//? routes
//* home route
app.get("/", (req, res) => {
  try {
    res.send(`Hello users, to create your blog for everyone`);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while getting home response", error });
  }
});

//todo: main routes

// user route
app.use("/api/v1/user", userRouter);

// post route
app.use("/api/v1/post", postRouter);

// comment route
app.use("/api/v1/post_comment", commentRouter);

// like route
app.use("/api/v1/like", likeRouter);

module.exports = app;

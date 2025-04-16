const express = require("express");
const router = express.Router();

// middlewares
const { generateToken, verifyToken } = require("../middlewares/jwt.token");
const authorizeRole = require("../middlewares/rolebase.role");

// controllers
const {
  createPost,
  postData,
  updatePost,
  getPostsByUserId,
} = require("../controllers/blog.controller");

// create post
// endpoint : http://localhost:3000/api/v1/post/create_post
router.post(
  "/create_post/:id",
  verifyToken,
  authorizeRole(["admin", "user"]),
  createPost
);

// endpoint : http://localhost:3000/api/v1/post/all_data
router.get(
  "/all_data",
  verifyToken,
  authorizeRole(["admin", "user"]),
  postData
);

// update post data
// endpoint : http://localhost:3000/api/v1/post/update/1
router.patch(
  "/update/:id",
  verifyToken,
  authorizeRole(["admin", "user"]),
  updatePost
);

// endpoint : http://localhost:3000/api/v1/post/userId/:userId
router.get(
  "/userId/:userId",
  verifyToken,
  authorizeRole(["admin", "user"]),
  getPostsByUserId
);

module.exports = router;

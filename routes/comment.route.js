const express = require("express");
const router = express.Router();

// middlewares
const { verifyToken } = require("../middlewares/jwt.token");
const authorizeRole = require("../middlewares/rolebase.role");

// controllers
const {
  createComment,
  getAllComments,
} = require("../controllers/comment.controller");

// create comment
// endpoint : http://localhost:3000/api/v1/post_comment/comment/3
router.post(
  "/comment/:blogpostId",
  verifyToken,
  authorizeRole(["admin", "user"]),
  createComment
);

// get all comments data
// endpoint : http://localhost:3000/api/v1/post_comment/data

router.get(
  "/data/",
  verifyToken,
  authorizeRole(["admin", "user"]),
  getAllComments
);

module.exports = router;

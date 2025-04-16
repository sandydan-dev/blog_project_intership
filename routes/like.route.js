const express = require("express");
const router = express.Router();

// middlewares
const { verifyToken } = require("../middlewares/jwt.token");
const authorizeRole = require("../middlewares/rolebase.role");

const {
  createLikePost,
  getAllLikedPostComments,
  getBlogLikedData,
} = require("../controllers/like.controller.js");

// routes
router.post(
  "/post/liked",
  verifyToken,
  authorizeRole(["admin", "user"]),
  createLikePost
);

// routes
router.get(
  "/data/liked",
  verifyToken,
  authorizeRole(["admin", "user"]),
  getAllLikedPostComments
);

router.get(
  "/blog_post/liked",
  verifyToken,
  authorizeRole(["admin", "user"]),
  getBlogLikedData
);

module.exports = router;

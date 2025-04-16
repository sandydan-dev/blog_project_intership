const User = require("../models/user.model");
const BlogPost = require("../models/blogPost.model");
const Comment = require("../models/comment.model");

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogpostId = parseInt(req.params.blogpostId);

    const userId = req.user.id || req.user._id || req.user.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User id not found in authentication" });
    }

    if (!content) {
      return res.status(400).json({
        message: "Comment content is required",
      });
    }

    // check if blog post exists
    const blogPost = await BlogPost.findByPk(blogpostId);

    if (!blogPost) {
      return res.status(404).json({
        message: "Blog post not found",
      });
    }

    // create new comment
    const newComment = new Comment({
      content,
      userId: userId,
      blogpostId: blogpostId,
    });

    // save the comments
    const saveComment = await newComment.save();

    // array comments
    if (Array.isArray(blogPost.comments)) {
      blogPost.comments.push(saveComment._id);
      await blogPost.save();
    }

    return res.status(201).json({
      message: "Comment created successfully",
      data: saveComment,
    });

    blog;
  } catch (error) {
    return res.status(500).json({
      message: "Error while creating comment",
      error: error.message,
    });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comment = await Comment.findAll();

    if (comment.length === 0) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({ message: "Comments data", comment });
  } catch (error) {
    return res.status(500).json({
      message: "Error while getting comments data",
      error,
    });
  }
};

module.exports = {
  createComment,
  getAllComments
};

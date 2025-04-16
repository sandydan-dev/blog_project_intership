const User = require("../models/user.model");
const BlogPost = require("../models/blogPost.model");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const { post } = require("../routes/blog.route");

const createLikePost = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { blogpostId, commentId } = req.body;

    console.log("Request body:", req.body); // ✅ Logs request data before proceeding

    if (!blogpostId || !commentId) {
      return res
        .status(400)
        .json({ message: "BlogPost ID and Comment ID are required" });
    }

    // Ensure commentId exists (Only check if `commentId` is provided)
    if (commentId) {
      const comment = await Comment.findByPk(commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
    }

    console.log("userId ", userId);
    console.log("blogpostId", blogpostId);
    console.log("commentId", commentId);

    // find the user id
    const user = await User.findByPk(userId);
    // if user id not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // check if the blog post exist
    const blogpost = await BlogPost.findByPk(blogpostId);
    if (!blogpost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // if comment id not found from the comment mode
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment id not found" });
    }

    // Check if user already liked the blog post or comment
    const existingLike = await Like.findOne({
      where: {
        userId: userId,
        blogpostId,
        ...(commentId && { commentId }), // If commentId is provided, check that too
      },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "User has already liked this post/comment" });
    }

    // create liked
    const liked = await Like.create({
      userId: userId,
      blogpostId,
      commentId,
    });

    // save the like
    const saveLiked = await liked.save();

    return res.status(200).json({ message: "User liked the post", saveLiked });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while liked the comment and blogpost", error });
  }
};

const getAllLikedPostComments = async (req, res) => {
  try {
    const like = await Like.findAll();

    if (like.length === 0) {
      return res.status(404).json({ message: "No liked data found" });
    }

    return res.status(200).json({ message: "Liked List", like });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting all liked data", error });
  }
};

// get only blogpostId liked data
const getBlogLikedData = async (req, res) => {
  try {
   
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting blog liked data", error });
  }
};

module.exports = {
  createLikePost,
  getAllLikedPostComments,
  getBlogLikedData,
};

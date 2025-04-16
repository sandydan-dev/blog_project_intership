const BlogPost = require("../models/blogPost.model");
const User = require("../models/user.model");

// create new blog
const createPost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, slug, content, status } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // find user by id
    const user = await User.findOne({
      where: { id },
    });

    // if not found id throw error
    if (!user) {
      return res.status(404).json({ message: "User id not found" });
    }

    // create post
    const newPost = await BlogPost.create({
      title,
      slug,
      content,
      status: status || "draft",
      userId: id,
    });

    return res
      .status(201)
      .json({ message: "Blog Post created Successfully", post: newPost });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return res.status(500).json({
      message: "Failed to create blog post",
      error: error.message,
    });
  }
};

// get all blogs data

const postData = async (req, res) => {
  try {
    const post = await BlogPost.findAll();

    if (post.length === 0) {
      return res.status(404).json({ message: "Blog data not found" });
    }

    return res.status(200).json({ message: "Blog Post Data", post });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting all data", error });
  }
};

// update data by id
const updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, slug, content, status } = req.body;

    const postId = await BlogPost.findOne({
      where: { _id: id },
    });

    if (!postId) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // update post data
    const updatePost = await post.update({
      title: title || post.title,
      slug: slug || post.slug,
      content: content || post.content,
      status: status || post.status,
    });

    return res
      .status(200)
      .json({ message: "Blog post updated successfully", updatePost });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while updating post", error });
  }
};

// get blog post data by userId
const getPostsByUserId = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // validation userId is required
    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }

    // check is user exists
    const user = await User.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find all blogs by the user
    const posts = await BlogPost.findAll({
      where: { userId: userId },
      order: [["userId", "DESC"]],
    });

    // if post data not round
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "No blog post found for this user" });
    }

    // return the all post which user created
    return res.status(200).json({
      message: "Blog posts retrieved successfully",
      count: posts.length,
      posts: posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve blog posts",
      error: error.message,
    });
  }
};

// update status

module.exports = {
  createPost,
  postData,
  updatePost,
  getPostsByUserId,
};

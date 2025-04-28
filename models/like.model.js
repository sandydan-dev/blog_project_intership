const User = require("../models/user.model");
const Comment = require("../models/comment.model");
const BlogPost = require("../models/blogPost.model");

const sequelize = require("../lib/sequelize.connection");
const { DataTypes } = require("sequelize");

const Like = sequelize.define("like", {});

// association with all models like Comment, BlogPost, 

module.exports = Like;

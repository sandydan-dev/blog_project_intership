const sequelize = require("../lib/sequelize.connection");
const { DataTypes } = require("sequelize");

const BlogPost = sequelize.define(
  "blogpost",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "draft",
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "blogposts",
    timestamps: true,
  }
);

// association
BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User, {
    foreignKey: "userId",
  });
  // blog post has many comments
  BlogPost.hasMany(models.Comment, {
    foreignKey: "commentId",
  });
};

module.exports = BlogPost;

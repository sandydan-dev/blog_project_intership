const sequelize = require("../lib/sequelize.connection");
const { DataTypes } = require("sequelize");

const Like = sequelize.define(
  "like",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    blogpostId: {
      type: DataTypes.INTEGER,
      references: {
        model: "blogposts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: "comments",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "likes",
    timestamps: true,
  }
);

// Association
Like.associate = (models) => {
  // Like belongs to user
  Like.belongsTo(models.User, {
    foreignKey: "userId",
  });

  // Like belongs to blogPost
  Like.belongsTo(models.BlogPost, {
    foreignKey: "blogpostId",
  });
  // like belongs to comments
  Like.belongsTo(models.Comment, {
    foreignKey: "commentId",
  });
};

module.exports = Like;

const sequelize = require("../lib/sequelize.connection");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
  "comment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    blogpostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "blogposts",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    tableName: "comments",
    timestamps: true,
  }
);

// association
Comment.associate = (models) => {
  Comment.belongsTo(models.BlogPost, {
    foreignKey: "blogpostId",
  });
  Comment.belongsTo(models.User, {
    foreignKey: "userId",
  });
};

module.exports = Comment;

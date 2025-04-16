const sequelize = require("../lib/sequelize.connection");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

User.associate = (models) => {
  User.hasMany(models.BlogPost, {
    foreignKey: "userId",
  });
  User.hasMany(models.Comment, {
    foreignKey: "userId",
  });
  User.hasMany(models.LIke, {
    foreignKey: "userId",
  });
};

module.exports = User;

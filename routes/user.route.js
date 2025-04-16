const express = require("express");
const router = express.Router();

const authorizeRole = require("../middlewares/rolebase.role");
const { verifyToken } = require("../middlewares/jwt.token");

// controllers
const {
  createUser,
  login,
  allUsers,
  usersDataId,
  updataUserById,
  deleteUser,
} = require("../controllers/user.controller");

//* create new users
// endpoint : http:localhost//api/user/register
router.post("/register", createUser);

// endpoint : http://localhost:3000/api/v1/user/login
//* login users
router.post("/login", login);

// endpoint : http://localhost:3000/api/v1/user/data
//* all users
router.get("/data", verifyToken, authorizeRole(["admin"]), allUsers);

// endpoint : http://localhost:3000/api/v1/user/id/1
//* get user data by id
router.get("/id/:id", usersDataId);

// endpoint : http://localhost:3000/api/v1/user/update/1
//* update user data
router.post(
  "/update/:id",
  verifyToken,
  authorizeRole(["user", "admin"]),
  updataUserById
);

// endpoint : http://localhost:3000/api/v1/user/delete/1
router.delete("/delete/:id", deleteUser);

// Protected route (Requires authentication & role check)
// endpoint : http://localhost:3000/api/v1/user/admin-dashboard
router.get(
  "/admin-dashboard",
  verifyToken,
  authorizeRole(["admin", "user"]),
  (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard!", user: req.user });
  }
);

module.exports = router;

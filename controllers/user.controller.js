const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../middlewares/jwt.token");
const { all } = require("..");

//todo: create new user
const createUser = async (req, res) => {
  try {
    // get data from body
    const { username, email, password, role } = req.body;

    // if any data not added
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }

    // check if already exist,then login only
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Your email already register, please login" });
    }

    // hashed password
    const salt = await bcrypt.genSalt(10); // salt round 10
    const hashedPassword = await bcrypt.hash(password, salt); // hashed password

    // creating new user
    const users = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // save new user data in database
    const saveUser = await users.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", saveUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while registering user", error });
  }
};

//todo: login user
const login = async (req, res) => {
  try {
    // add data which created and login as it email password
    const { email, password } = req.body;

    // if not found both return error
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // find email if not registered
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Email not exist, register first" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // generate token
    const token = generateToken(user);

    // set token in cookie http only for security
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // set true for security https
    });

    // set token in headers
    res.setHeader("Authorization", `Bearer ${token}`);

    return res
      .status(200)
      .json({ message: "User logged in success", user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

//todo: get all users details
const allUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return res.status(404).json({ message: "Users data not found" });
    }

    return res.status(200).json({ message: "All Users Data", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting users data list", error });
  }
};

//todo: get data by id
const usersDataId = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const users = await User.findByPk(id);

    if (!users) {
      return res.status(404).json({ message: "user id not found" });
    }

    return res.status(200).json({ message: "User id is", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting user id ", error });
  }
};

const updataUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { username, email, password, role } = req.body;

    const users = await User.findByPk(id);

    if (!users) {
      return res.status(404).json({ message: "User id not found" });
    }

    const updatedData = [];

    if (username) {
      updatedData.username = username;
    }

    if (email) {
      updatedData.email = email;
    }

    if (role) {
      updatedData.role = role;
    }

    // hashed password before update

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      updatedData.password = hashPass;
    }

    // update user data;
    await User.update(updatedData, {
      where: { id },
    });

    // save data
    await users.save();

    // fetch updated user
    const updatedUser = await User.findByPk(id);

    return res.status(201).json({ message: "updated user data", updatedUser });
  } catch (error) {
    return res.status(500).json({
      message: "Error while updating user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const users = await User.findByPk(id);

    if (!users) {
      return res.status(404).json({ message: "user id not found" });
    }

    const idDeleteUser = await User.destroy({
      where: { id },
    });

    return res
      .status(200)
      .json({ message: "user deleted successfully", idDeleteUser });
  } catch (error) {
    return res.status(500).json({
      message: "Error while deleting user",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  login,
  allUsers,
  usersDataId,
  updataUserById,
  deleteUser,
};

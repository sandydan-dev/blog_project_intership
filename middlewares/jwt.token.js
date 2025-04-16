const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1y",
  });

  return token;
}

// verify token

function verifyToken(req, res, next) {
try {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Invalid token" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = decoded;

  next();
} catch (error) {
  return res.status(403).json({ message: "Invalid or expired token.", error: error.message });
}
}

module.exports = {
  generateToken,
  verifyToken,
};

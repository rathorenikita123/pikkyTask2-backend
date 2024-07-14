const jwt = require("jsonwebtoken");
const { secret } = require("../config");

exports.authenticate = (req, res, next) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjkzYTQ2MDhhMjMyYjA2NzJmYTNhMDQiLCJpYXQiOjE3MjA5NTI4NjcsImV4cCI6MTcyMDk1NjQ2N30.x0bTLQNc0eVjTPS6RvL1LaRXnBkVOPZW2UpoLK0ceQw";
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Invalid token format." });
  }

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

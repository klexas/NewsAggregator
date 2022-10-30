require("dotenv").config(); // loading env variables
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      res.status(400).json({ error: "No authorization header" });

    const token = req.headers.authorization.split(" ")[1];
    if (!token) res.status(400).json({ error: "malformed auth header" });

    const payload = await jwt.verify(token, process.env.SECRET);
    if (!payload) res.status(400).json({ error: "token verification failed" });
    // request store for the downstream
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  isLoggedIn,
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenAuthorizer = function (req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" "); //breaks splits at ' ' and returns an array.
  //const token = authHeader.split(" ")[1]; returns '.split(" ")' returns an array whose second element is token.
  if (scheme != "Bearer" || !token) {
    return res.json({
      message: "Missing or Invalid authorization Header",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      username: decoded.username,
      user_id: decoded.user_id,
      role: decoded.role,
    };
    console.log(decoded);
    next();
  } catch (err) {
    if (err.message == "jwt expired") {
      res.status(401).json({ message: "Access token expired" });
    }
    return res.status(401).json({
      message: "Invalid authorization Header",
    });
  }
};

module.exports = { tokenAuthorizer };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Getting Authorization from headers
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new Error("Access Denied");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("JWT token is required");
  }

  let decodedToken;
  try {
    // @ts-ignore
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw err;
  }

  if (!decodedToken) {
    // if either token is invalid or has expired
    throw new Error("Invalid or expired token");
  }

  // @ts-ignore
  const exp = (decodedToken.exp || 0) * 1000;
  const jwtExpDate = new Date(exp);
  const today = new Date();

  if (jwtExpDate < today) {
    throw new Error("TOKEN EXPIRED");
  }

  // @ts-ignore
  req.id = decodedToken.id;

  next();
};

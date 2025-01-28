const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach decoded payload to request
    next(); // Proceed to the next middleware/controller
  } catch (err) {
    console.error("Token validation error:", err.message);
    return res.status(401).json({ error: "Unauthorized: Token invalid or expired" });
  }
};

module.exports = authenticate;
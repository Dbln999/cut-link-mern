const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = jwt.verify(token, process.env.secret);
    req.user = user;
    next();
  } catch (e) {
    res.clearCookie("token");
    return res.redirect("/auth");
  }
};

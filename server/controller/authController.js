const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.secret, { expiresIn: "24h" });
};

class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "This user is already registered" });
      }
      const hashedPassword = bcrypt.hashSync(password, 6);
      const user = await User.create({ username, password: hashedPassword });
      await user.save();
      return res.json({ message: "User created successfully" });
    } catch (e) {
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (!candidate) {
        return res.status(400).json({ message: "This user is not registered" });
      }
      const validation = bcrypt.compareSync(password, candidate.password);

      if (!validation) {
        return res.status(400).json({ message: "Incorrect data" });
      }
      const token = generateAccessToken(candidate._id);
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({ message: "Successfully", token, candidate });
    } catch (e) {
      res.status(400).json({ message: "Log in error" });
    }
  }
}

module.exports = new AuthController();

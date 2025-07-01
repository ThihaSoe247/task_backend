const User = require("../model/User");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const createToken = require("../helper/createToken");
const userController = {
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let user = await User.login(email, password);
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
  register: async (req, res) => {
    try {
      let { name, email, password } = req.body;
      let user = await User.register(name, email, password);
      let token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      return res.json({ user, token });
    } catch (e) {
      return res.status(400).json({
        error: e.message,
      });
    }
  },
  logout: async (req, res) => {
    res.cooke("jwt", "", {
      maxAge: 1,
    });
    return res.json({
      message: "user Logged out",
    });
  },
};

module.exports = userController;

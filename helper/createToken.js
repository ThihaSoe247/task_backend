const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
module.exports = function createToken(_id) {
  return jwt.sign({ _id }, "my_tasks_web_secret_1412", { expiresIn: maxAge });
};

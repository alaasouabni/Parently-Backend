const User = require("../../models/User");
const jwt = require("jsonwebtoken");

module.exports = function (req, res) {
  const { email, password } = req.body;
  
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(password, function (err, same) {
        if (err) {
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else if (!same) {
          res.status(401).json({
            error: "Incorrect email or password",
          });
        } else {
          // Issue token
          const payload = { email, id: user.id , first_name:user.first_name, last_name:user.last_name };
          const token = jwt.sign(payload, process.env.AUTH_SECRET, {
            expiresIn: "48h",
          });
          res.cookie("access-token", token, { sameSite: 'none', secure: true }).status(200).json(payload);
        }
      });
    }
  });
};

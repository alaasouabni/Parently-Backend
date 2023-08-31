const User = require("../../models/User");

module.exports = function (req, res) {
  User.findOne({ _id: req.user.id }, function (err, user) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
     return  res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      // Issue token
      const payload = {
        email:user.email,
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
      };
      const token = req.cookies["access-token"];
      res.cookie("access-token", token, { httpOnly: true }).status(200).json(payload);
    }
  });
};

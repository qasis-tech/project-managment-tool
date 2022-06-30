const User = require("../model/model");
const bcrypt = require("bcrypt");
exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) res.send("No user found");
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) res.send(error);
          else if (match) {
            if (user.role === "admin")
              res.status(500).send(`Welcome, ${user.firstname}`);
            if (user.role === "employee")
              res.status(500).send(`Welcome, ${user.firstname}`);
          } else res.send("password do not match");
        });
      }
    })
    .catch((error) => {
      res.send(error);
    });
};

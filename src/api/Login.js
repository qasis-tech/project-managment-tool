const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.login = (req, res) => {
  User.findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) res.send("No user found");
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) res.send(error);
          else if (match) {
            const newtoken = jwt.sign({
                email: user.email,
                firstname: user.firstname,
                _id: user._id,
              },
              "RESTFULAPIs"
            );
            User.updateOne({
              email: req.body.email,
            }, {
              $set: {
                token: newtoken,
              },
            }).then((login) => {
              if (!login) {
                return res.status(404).send({
                  message: "User not found with id ",
                });
              }
              let email = req.body.email;
              User.find({
                email: email,
              }).then((users) => {
                res.send(users);
              });
            });
          } else res.send("password do not match");
        });
      }
    })
    .catch((error) => {
      res.send(error);
    });
};
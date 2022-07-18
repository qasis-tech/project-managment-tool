const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user)
      res.status(404).send({
        data: [],
        message: "Invalid User..!",
        success: false,
      });
    else {
      bcrypt.compare(req.body.password, user.password, (error, match) => {
        if (error) res.send(error);
        else if (match) {
          const newtoken = jwt.sign({
            email: user.email,
            firstname: user.firstname,
            _id: user._id,
          }, "QASISTECHNOLOGIES_jwtsecretkey");
          User.updateOne({
            email: req.body.email,
          }, {
            $set: {
              token: newtoken,
            },
          }).then((login) => {
            if (!login) {
              return res.status(404).send({
                data: [],
                message: "Invalid User..!",
                success: false,
              });
            }
            let email = req.body.email;
            User.find({
              email: email,
            }).then((users) => {
              res.status(200).send({
                data: [users],
                message: "Successfully Login..!",
                success: true,
              });
            });
          });
        } else
          res.status(404).send({
            data: [],
            message: "password do not match..!",
            success: false,
          });
      });
    }
  });
};
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  const newpath = __dirname + "/uploads/";
  const file = req.files.file;
  const filename = file.name;

  file.mv(`${newpath}${filename}`, (err, ree) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }

    console.log("ree", ree);
    bcrypt.hash(req.body.password, rounds, (error, hash) => {
      if (error) res.send(error);
      else {
        const newUser = User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          gender: req.body.gender,
          age: req.body.age,
          address: req.body.address,
          qualification: req.body.qualification,
          designation: req.body.designation,
          mobilenumber: req.body.mobilenumber,
          file: req.files.file,
          email: req.body.email,
          password: hash,
          role: "employee",
        });

        newUser
          .save()
          .then((user) => {
            res.send(user);
          })
          .catch((error) => {
            res.send(error);
          });
      }
    });
  });
};

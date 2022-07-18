const tokenFn = require("../utils/common");
const multer = require("multer");
const User = require("../model/user");
const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({
    storage: Storage,
}).single("profilepic");

exports.addPic = async (req, res) => {
    const token = req.query.token;
    let result = await tokencheck(token);
    if (result) {
        upload(req, res, (err) => {
            if (err) {
                res.status(404).send({
                    data: [err],
                    message: "Error in image uploading..!",
                    success: false,
                });
            } else {

                User.updateOne({
                    token: req.query.token,
                }, {
                    $set: {
                        profilepic: req.file.path,
                    },
                }).then((success) => {
                    if (!success) {
                        return res.status(404).send({
                            data: [],
                            message: "Invalid User..!",
                            success: false,
                        });
                    }
                    User.findOne({
                        token: req.query.token,
                    }).then((users) => {
                        res.status(200).send({
                            data: [users],
                            message: "Successfully Added Your Profile Picture..!",
                            success: true,
                        });
                    });
                })
            }
        });
    } else {
        res.status(404).send({
            data: [],
            message: "User not found..!",
            success: false,
        });
    }
};

exports.viewPic = async (req, res) => {
    let token = req.query.token;
    let result = await tokencheck(token);
    if (result) {
        User.findOne({
            token: req.query.token,
        }).then((users) => {
            res.status(200).send({
                data: [users],
                message: "Successfully displayed your details..!",
                success: true,
            });
        });
    } else {
        res.status(404).send({
            data: [],
            message: "User not found..!",
            success: false,
        });
    }
};

exports.deletePic = async (req, res) => {
    let token = req.query.token;
    let result = await tokencheck(token);
    if (result) {
        User.updateOne({
                token: req.query.token,
            }, {
                $set: {
                    profilepic: null,
                },
            })
            .then((user) => {
                res.status(200).send({
                    data: [],
                    message: "Successfully deleted profile picture..!",
                    success: true,
                });
            })
    } else {
        res.status(404).send({
            data: [],
            message: "User not found..!",
            success: false,
        });
    }
}
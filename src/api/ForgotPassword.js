const User = require("../model/user");
const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const rounds = 10;
exports.sendOtp = (req, res) => {
    const myOtp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
    });
    User.findOne({
        email: req.body.email,
    }).then((user) => {
        if (!user)
            res.status(404).send({
                data: [],
                message: "Email not exists..!",
                success: false,
            });
        else {
            User.updateOne({
                email: req.body.email,
            }, {
                $set: {
                    resetotp: myOtp,
                },
            }).then((success) => {
                const msg = {
                    from: "veenavijayan38@gmail.com",
                    to: req.body.email,
                    subject: "OTP for reset your password",

                    html: "Hello ! <br><br>This is your One Time Password to reset your password in Project Management Tool...<br><br><b><u>" +
                        myOtp +
                        "</b></u><br><br>Thank You..",
                };
                nodemailer
                    .createTransport({
                        service: "gmail",
                        auth: {
                            user: "veenavijayan38@gmail.com",
                            pass: "rqdpilsciczoskpw",
                        },
                        port: 465,
                        host: "smtp.gmail.com",
                        from: "veenavijayan38@gmail.com"
                    })
                    .sendMail(msg, (err) => {
                        if (err) {
                            return res.status(404).send({
                                data: [err],
                                message: "Error in sending mail",
                                success: false,
                            });
                        } else {
                            res.status(200).send({
                                data: [],
                                message: "OTP Sent Successfully ..!",
                                success: true,
                            });
                        }
                    });
            });
        }
    });
};

exports.reset = (req, res) => {
    User.findOne({
        resetotp: req.body.otp,
    }).then((user) => {
        if (!user)
            res.status(404).send({
                data: [],
                message: "Wrong OTP..!",
                success: false,
            });
        else {
            let newPassword = req.body.newpassword;
            let confirmPassword = req.body.confirmpassword;
            if (newPassword !== confirmPassword) {
                res.status(404).send({
                    data: [],
                    message: "New password and confirm password mismatch..!",
                    success: false,
                });
            } else {
                bcrypt.hash(req.body.newpassword, rounds, (error, hash) => {
                    if (error)
                        res.status(404).send({
                            data: [error],
                            message: "Error..!",
                            success: false,
                        });
                    else {
                        User.updateOne({
                            resetotp: req.body.otp,
                        }, {
                            $set: {
                                password: hash,
                            },
                        }).then((success) => {
                            if (!success) {
                                res.status(404).send({
                                    data: [],
                                    message: "Error in reset password..!",
                                    success: false,
                                });
                            }
                            res.status(200).send({
                                data: [],
                                message: "Reset your password successfully..!",
                                success: true,
                            });
                        });
                    }
                });
            }
        }
    });
};
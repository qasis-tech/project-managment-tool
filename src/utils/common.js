const User = require("../model/user");
module.exports = tokencheck = async (token) => {

    let result = await User.find({
        token: token
    });
    return result.length
}
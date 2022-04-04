const User = require('../models/user')
module.exports.create = function (req,res) {
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    return res.redirect('back')
}
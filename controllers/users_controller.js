const User = require('../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const resetPassMailer = require('../mailers/reset_password_mailer')
const resetTokken = require('../models/reset_password_tokken')
const crypto = require('crypto')

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile')
  }
  return res.render('sign-in', {
    title: 'Sign In',
  })
}

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile')
  }
  return res.render('sign-up', {
    title: 'Sign Up',
  })
}

module.exports.createUser = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    req.flash('warning','Confirm Password should be match')
    return res.redirect('back')
  }

  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    await User.create(req.body)
    req.flash('success','Account Created Successfully')
    return res.redirect('/users/sign-in')
  } else {
    req.flash('warning','You are already registered')
    return res.redirect('back')
  }
}

module.exports.update = async function (req, res, next) {
  if (req.user.id == req.params.id) {
    try {
      if (req.body.password == '') {
        delete req.body.password
      } else {
        req.body.password = await bcrypt.hash(req.body.password, 10)
      }
      User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        req.flash('warning','Profile Updated')
        return res.redirect('back')
      })
    } catch (error) {
      console.log(error)
      return res.redirect('back')
    }
  } else {
    req.flash('error','Unauthorized Request')
    return res.redirect('back')
  }
}

module.exports.destroySession = function (req, res) {
  req.logout()
  req.flash('info','You have logged out successfuly')
  return res.redirect('/')
}

module.exports.profile = async function (req, res) {
  if (req.isAuthenticated()) {
    return res.render('profile', {
      title: `Auth | Profile | ${req.user.name}`,
    })
  }
  return res.redirect('/users/sign-in')
}

module.exports.createSession = function (req, res) {
  req.flash('success','Logged in successfully')
  return res.redirect('/')
}

module.exports.forgotPassword = function (req, res) {
  return res.render('forgot_password', {
    title: 'Forgot Password',
  })
}

module.exports.forgotPasswordEmail = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('Error in finding User in Db', err)
      return
    }
    if (user) {
      resetTokken.create(
        {
          user: user._id,
          tokken: crypto.randomBytes(20).toString('hex'),
        },
        function (err, tokken) {
          resetPassMailer.resetPassword(user, tokken)
          
          return res.render('success-mail', {
            title: 'Email Sent'
          })
        }
      )
    } else {
      req.flash('error', 'User Not Found')
      return res.redirect('back')
    }
  })
}

module.exports.resetPassword = function (req, res) {
  resetTokken.findOne(
    { tokken: req.params.access_tokken },
    function (err, tokken) {
      if (err) {
        console.log('Error in fetching token in Db', err)
        return
      }
      return res.render('reset_password', {
        title: 'Reset Password',
        tokken,
      })
    }
  )
}

module.exports.resetPasswordTokken = function (req, res) {
  // resetTokken.findOne({tokken:req.params.})
  //{ password: '123', confirm_password: '123' }
  if (req.body.password != req.body.confirm_password) {
    req.flash('error', "Confirm Password didn't match")
    return res.redirect('back')
  } else {
    resetTokken.findOne(
      { tokken: req.params.access_tokken },
      async function (err, tokken) {
        tokken.isValid = false
        await tokken.save()
        req.body.password = await bcrypt.hash(req.body.password, 10)
        User.findByIdAndUpdate(tokken.user, req.body, function (err, user) {
          req.flash('info','Password Reset Successfully')
          return res.redirect('/users/sign-in')
        })
      }
    )
  }
}

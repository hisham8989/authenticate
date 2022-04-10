const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback:true
    },
    async function (req,email, password, done) {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          req.flash('error','Invalid Username/Password')
          return done(null, false)
        }
        
          const isMatch = await bcrypt.compare(password, user.password)
          if (!isMatch){
            req.flash('error','Invalid Username/Password')
            return done(null, false)
          }
        
        return done(null, user)
      } catch (error) {
        // console.log(error);
        return done(error)
      }
    }
  )
)

// User.findOne({ email }, function (err, user) {
//   if (err) {
//     console.log('Error in finding user passport')
//     return done(err)
//   }

//   console.log(isMatch)
//   if (!user || !isMatch) {
//     console.log('Invalid Username/Password ')
//     return done(null, false)
//   }
//   return done(null, user)
// })
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('Error in finding user passport')
      return done(err)
    }
    return done(null, user)
  })
})

passport.checkAuthentication = function (req, res, next) {
  // if the user is signed in, the pass on the request
  if (req.isAuthenticated()) {
    return next()
  }

  // if the user not signed in
  return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // req . user contains the current signed in user details from the session cookie
    // just sending user to the views

    res.locals.user = req.user
  }
  next()
}

module.exports = passport

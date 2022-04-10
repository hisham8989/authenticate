const passport = require('passport')

const googleStrategy = require('passport-google-oauth').OAuth2Strategy

const crypto = require('crypto')

const User = require('../models/user')

const env = require('./environment')

passport.use(
  new googleStrategy(
    {
      clientID: env.strategyClientId,
      clientSecret: env.strategyClientSecret,
      callbackURL: env.strategyCallbackUrl,
    },
    function (accessTokken, refreshTokken, profile, done) {
      // Find a user
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log('Error in finding User in Db from google strategy', err)
          return
        }
        // console.log(profile)

        // if user found , set this user as req.user
        if (user) {
          return done(null, user)
        } else {
          // if user not found , create a user & set this user as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString('hex'),
            },
            function (err, user) {
              if (err) {
                console.log(
                  'Error in Creating User in Db from google strategy',
                  err
                )
                return
              }
              return done(null, user)
            }
          )
        }
      })
    }
  )
)

module.exports = passport

const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')
const passport = require('passport')

/** Routes for /users/
 * Post create
 * Post create-session
 * Get profile
 * Get destroy-session
 */

router.get('/sign-up', usersController.signUp)
router.get('/sign-in', usersController.signIn)

router.post('/create', usersController.createUser)

router.get('/profile', passport.checkAuthentication, usersController.profile)

router.post('/update/:id', passport.checkAuthentication, usersController.update)

// use passport as a middleware to authenticate user
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/users/sign-in' }),
  usersController.createSession
)

router.get('/sign-out', usersController.destroySession)

/** reseting password pages */

router.get('/forgot-password',usersController.forgotPassword)
router.post('/forgot-password',usersController.forgotPasswordEmail)

router.get('/reset_password/:access_tokken', usersController.resetPassword)
router.post('/reset_password/:access_tokken', usersController.resetPasswordTokken)

module.exports = router

const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users_controller')

router.post('/create', usersController.create)

module.exports = router
const express = require('express')
const router = express.Router()

//import controller
const { signup, accountActivation, signin} = require('../controllers/auth') // because you exported as individual property you need to destructure it before using it

//import validators
const { userSignupValidator,userSigninValidator } = require('../validator/auth')
const { runValidation } = require('../validator')


router.post('/signup',userSignupValidator ,runValidation, signup)
router.post('/account-activation',accountActivation)
router.post('/signin',userSigninValidator ,runValidation, signin)


module.exports = router 
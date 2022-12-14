const { check } = require('express-validator')

// this entire file is for validation if it does not validate the incoming request it will throw Errors
exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid Email Address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long')
]

exports.userSigninValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Must be a valid Email Address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be atleast 6 characters long')
]
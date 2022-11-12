const {validationResult} = require('express-validator')

// this will catch the errors thrown while validation 
exports.runValidation = (req,res,next) => {
    const errors = validationResult(req)  // catch any errors which was produced during the check
    if(!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    next()
}
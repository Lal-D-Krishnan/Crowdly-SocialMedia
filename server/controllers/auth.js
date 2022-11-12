const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const { sendEmailWithNodemailer } = require("../helpers/email");

// exports.signup = (req,res)=>{
//     const { name,email,password } =  req.body

//     User.findOne({email}).exec((err,user)=> {
//         if(user){
//             return res.status(400).json({
//                 error:'Email is taken'
//             })
//         }
//     })
//     let newUser = new User({name,email,password})

//     newUser.save((err,success) =>{
//         if(err){
//             console.log('SIGNUP ERROR',err);
//             return res.status(400).json({
//                 error:err
//             })
//         }
//         res.json({
//             message: "Signup success! Please signin"
//         })
//     })
    
// }

exports.signup = (req,res)=>{
    const {name,email,password} = req.body

    User.findOne({email}).exec((err,user)=> {
        if(user){
            return res.status(400).json({
                error:'Email is taken'
            })
        }
    })

    const token = jwt.sign({name,email,password}, process.env.JWT_ACCOUNT_ACTIVATION, {expiresIn:'10m'})

    const emailData = {
        from: process.env.EMAIL_TO,
        to: email,
        subject: `Account activation Link`,
        html:`
            <h1>Please use the following link to activate the account.</h1>
            <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
            <hr/>
            <p>This email may contain sensitive information</p>
            <p>${process.env.CLIENT_URL}</p>
        `
    }
    sendEmailWithNodemailer(req, res, emailData);

    // sgMail.send(emailData).then(sent => {
    //     // console.log('SIGNUP EMAIL SENT', sent);
    //     return res.json({
    //         message: `Email has been sent to ${email}. Follow the instruction to activate your account.`
    //     })
    // })



}

exports.accountActivation = (req,res) => {
    const {token} = req.body

    if(token) {
        jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION, function(err,decoded){
            if(err){
                console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
                res.status(401).json({
                    error:'Expired link. Signup again.'
                })
            }else{
                const { name, email, password } = jwt.decode(token)

                const user = new User({ name ,email, password })
    
                user.save((err,user)=>{
                    if(err){
                        console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
                        return res.status(401).json({
                            error:'Error saving user in database. Try signup again.'
                        })
                    }
                    return res.json({
                        message:'Signup success. Please signin.'
                    })
                })
            }



        })
    }else{
        return res.json({
            message:'Something went wrong. Try again.'
        })
    }

}


exports.signin = (req,res)=>{
    const {email,password} = req.body
    //check if user exist
    User.findOne({email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:'User with that email does not exist. Please sign up!'
            })
        }
        // authenticate 
        if(!user.authenticate(password)) { // userdefined schema method
            return res.status(400).json({
                error:'Email and password do not match'
            })
        }
        //if true then 
        // generate token and send to client
        
        const token = jwt.sign({_id:user._id})

    })

}












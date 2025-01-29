const Customerror = require('../utils/customeError')
const User = require('./../models/user.model')
const asyncErrorHandler = require('./../utils/asynchandler')
const jwt = require('jsonwebtoken')


exports.signup = async (req,res,next)=>{
const newUser=User.create(req.body)

const token =jwt.sign({id:newUser._id},process.env.SECRET_STR,{
    expiresIn: process.env.LOIGN_EXPIRES

})

res.status(201).json({
    status:'success',
    token, 
    data:{
        user:newUser
    }
})

}

exports.login = (req,res, next)=>{
    const email =req.body.email;
    const password = req.body.password;

    if(!email && !password)
    {
        const error = new Customerror('please provide email id and password for login in',400);
        return next(error);
    }
     
    
}
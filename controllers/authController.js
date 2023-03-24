const jwt= require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.signup = async (req, res, next) => {
    try{
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        });

        const token = signToken({ id: newUser._id });
    
        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: newUser
            }
        });
    } catch(err) {
        console.log(err)
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if( !email || !password ) {
        console.log('Please provide email and password');
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password'
        });
    }

    // 2) Check if user exists && password iscorrect
    const user = await User.findOne({ email });

    if(!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect email or password'
        });
    }
    // 3) If everything ok, end token to client
    const token = signToken(user._id);

    res.status(200).json({
        status: 'sucess',
        token
    });
}
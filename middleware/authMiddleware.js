const jwt = require('jsonwebtoken');
const User = require('../models/User');

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, 'aardvarkValleyInstitute', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }
            else {
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = null;
        next();
    }
};

// Verify user is a teacher
const requireTeacher = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists and is valid
    if(token) {
        jwt.verify(token, 'aardvarkValleyInstitute', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                // check if the user is a teacher
                let user = await User.findById(decodedToken.id);
                if (user.isTeacher) {                    
                    console.log(decodedToken);
                    res.locals.user = user;
                    next();
                }
                else {
                    res.redirect('/');
                }
            }
        })
    }
    else {
        res.redirect('/login');
    }
};

// Verify user is a student
const requireStudent = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists and is valid
    if(token) {
        jwt.verify(token, 'aardvarkValleyInstitute', async (err, decodedToken) => {
            if(err) {
                console.log(err.message);
                res.redirect('/login');
            }
            else {
                // check if the user is a student
                let user = await User.findById(decodedToken.id);
                let student = false;

                if (!user.isTeacher) {              
                    console.log(decodedToken);
                    res.locals.user = user;
                    next();
                }
                else {
                    res.redirect('/');
                }
            }
        })
    }
    else {
        res.redirect('/login');
    }
};

module.exports = { checkUser, requireTeacher, requireStudent }
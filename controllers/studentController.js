const jwt = require('jsonwebtoken');
const Registration = require('../models/Registration');
const Course = require('../models/Course');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { course: '' }
    
    // duplicate error code
    if(err.code === 11000) {
        errors.course = "You have already registered for this course";
        return errors;
    }
}

module.exports.student_index = async (req, res) => {
    let registrations = {};
    let userId = getUser(req);

    Registration.find({ "userId": userId }).sort({ course: 1 })
        .then(regResult => {
            registrations = regResult;
        })
        .then(() => {
            Course.find().sort({ cname: 1 })
                .then((result) => {
                    res.render('students', {courses: result, registrations: registrations, title: 'Students' });
                })
                .catch((err) => {
                    console.log(err);
                });
            })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.registration_create_post = (req, res) => {
    const registration = new Registration(req.body);
    
    registration.save()
        .then((result) => {
            res.status(201).json({ result });
        })
        .catch(err => {
            const errors = handleErrors(err);
            res.status(404).json({ errors });
        });    
};

module.exports.registration_delete_post = (req, res) => {
    const id = req.params.id;

    Registration.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/students' });
        })
        .catch(err => {
            console.log(err);
            res.status(404).render('404', { title: '404' });
        });
};

module.exports.registrations_get = (req, res) => {
    let schedule = {};

    const userId = req.params.userId;

    try {
        schedule = Registration.find().where('userId').equals(userId);
        // Add logic to do something with the schedule
    }
    catch (err) {
        console.log(err);
        res.status(404).render('404', { title: '404' });
    }
};

function getUser (req) {
    const token = req.cookies.jwt;

    if(token) {
        let decodedToken = jwt.verify(token, 'aardvarkValleyInstitute');
        return decodedToken.id;
    }
    else {
        return null;
    }
};
const Subject = require('../models/Subject');
const Course = require('../models/Course');

module.exports.staff_index = (req, res) => {
    let subjects = {};

    Subject.find().sort({ title: 1 })
        .then(sResult => {
            subjects = sResult;            
        })
        .then(() => {
            Course.find().sort({ cname: 1 })
                .then((cResult) => {                    
                    res.render('staff', {courses: cResult, subjects: subjects, title: 'Staff' });
                })
                .catch((err) => {
                    console.log(err);
                });
            })                
        .catch((err) => {
            console.log(err);
        });
};
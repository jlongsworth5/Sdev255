const { Int32 } = require('bson');
const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    cname: {
        type: String,
        required: true,
    },
    cdescript: {
        type: String,
        required: true,
    },
    sarea: {
        type: String,
        required: true,   
    },
    chours: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;

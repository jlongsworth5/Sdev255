const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    }

}, { timestamps: true });

registrationSchema.index({ 'userId': 1, 'course': 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);
module.exports = Registration;

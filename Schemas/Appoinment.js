const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const appointmentSchema = new Schema({
    user: {
        // Reference to the user who created the appointment
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSession'
    },
    date: {
        type: Date
    },
    purpose: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Appointment', appointmentSchema);



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeSlotSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    bookedStatus: {
        type: String,
        enum: ['Available', 'NotAvailable'],
        default: 'Available'
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment'
    }
});

module.exports = mongoose.model('TimeSlot', timeSlotSchema);

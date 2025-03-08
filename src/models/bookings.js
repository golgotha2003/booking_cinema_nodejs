const { Schema, default: mongoose } = require("mongoose");
const BookingStatus = require("../utils/BookingStatusEnum");

var BookingSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    showtime_id: {
        type: Schema.Types.ObjectId,
        ref: 'Showtime',
        required: true
    },
    seat_number: {
        type: Number,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    },
    booking_status: {
        type: String,
        enum: Object.values(BookingStatus),
        default: BookingStatus.PENDING
    }
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
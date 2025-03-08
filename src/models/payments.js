const { Schema } = require("mongoose");
const PaymentMethod = require("../utils/PaymentMethodEnum");
const PaymentStatus = require("../utils/PaymentStatusEnum");

var PaymentSchema = new Schema({
    booking_id: {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    payment_method: {
        type: String,
        enum: Object.values(PaymentMethod),
        default: PaymentMethod.CASH
    },
    payment_status: {
        type: String,
        enum: Object.values(PaymentStatus),
        default: PaymentStatus.PENDING
    },
    payment_date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    }
});

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
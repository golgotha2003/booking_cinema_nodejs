const { Schema, default: mongoose } = require("mongoose");

var ShowtimeSchema = new Schema({
    movie_id: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    room_id: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    show_date: {
        type: Date,
        required: true
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

const Showtime = mongoose.model('Showtime', ShowtimeSchema);

module.exports = Showtime;
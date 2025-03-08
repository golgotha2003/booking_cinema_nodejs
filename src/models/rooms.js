const { Schema, default: mongoose } = require("mongoose");
const RoomType = require("../utils/RoomTypeEnum");

var RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    seat_count: {
        type: Number,
        required: true
    },
    room_type: {
        type: String,
        enum: Object.values(RoomType),
        default: RoomType.STANDARD
    }
}, {
    timestamps: true
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
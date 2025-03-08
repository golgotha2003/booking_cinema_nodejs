const { default: mongoose, Schema } = require("mongoose");
const { updateMany } = require("./users");

var MovieSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
    },
    duration: {
        type: Number,
        required: true
    },
    poster_url: {
        type: String,
    },
    trailer_url: {
        type: String,
    },
    release_date: {
        type: Date,
    }
}, {
    timestamps: true
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
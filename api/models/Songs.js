const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SongSchema = new Schema({
    songName: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    songUrl: {
        type: String,
        required: true
    },
    songRating: {
        type: Number,
        required: true
    },
    favorite: {
        type: Boolean
    },
    dateOfEntering: {
        type: String,
        required: true
    },
    dateOfEditing: {
        type: String,
        required: false
    },
    CategoryID: {
        type: String,
        required: true
    }
})

const Songs = mongoose.model('songs', SongSchema);

module.exports = Songs;
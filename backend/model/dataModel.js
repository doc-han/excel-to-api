const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    slug: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    keys: {
        type: Array,
        required: true
    }
})


module.exports = mongoose.model('data', dataSchema);

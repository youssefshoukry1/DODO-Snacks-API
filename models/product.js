const mongoose = require('mongoose');
const productschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    prices: {
        quarterKilo: {
            type: Number,
            required: true
        },
        halfKilo: {
            type: Number,
            required: true
        },
        kilo: {
            type: Number,
            required: true
        }
    }
})

module.exports = mongoose.model('productschema', productschema);


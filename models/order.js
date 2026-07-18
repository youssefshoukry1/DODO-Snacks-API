const mongoose = require('mongoose');
const validator = require('validator');
const orderSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productschema',
            required: true
        },
        title: String,
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        size: {
            type: String,
            enum: ['quarterKilo', 'halfKilo', 'kilo'],
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema);
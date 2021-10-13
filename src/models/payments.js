const { Schema, model } = require('mongoose');

const PaymentSchema = new Schema({
    amount: {type: Number, required: true },
    userId: {
        type: Schema.Types.ObjectId,        
        ref: 'User'
    },
    createdAt: {type: Date, required: true } 
})

const Payment = model('Payment', PaymentSchema)
module.exports = Payment;
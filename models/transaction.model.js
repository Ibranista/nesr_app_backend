import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    fundedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FundedUser',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['credit', 'debit']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
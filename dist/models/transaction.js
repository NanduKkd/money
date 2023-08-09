"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    person: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
        default: '',
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    type: {
        type: String,
        enum: ['transaction', 'self', 'roll'],
        required: true,
    },
    category: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: function () {
            return this.type === 'transaction';
        },
    },
    account: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: function () {
            return this.type === 'transaction' || this.type === 'roll';
        }
    },
    fromaccount: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: function () {
            return this.type === 'self';
        }
    },
    toaccount: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: function () {
            return this.type === 'self';
        }
    },
    rollperson: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        required: function () {
            return this.type === 'roll';
        }
    },
});
exports.default = mongoose_1.default.model('transaction', transactionSchema, 'transactions');

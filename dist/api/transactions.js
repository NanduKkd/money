"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_1 = __importDefault(require("../models/transaction"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new Error();
        const transactions = yield transaction_1.default.aggregate([
            { $match: { person: req.user._id } },
            { $sort: { date: -1 } },
            { $lookup: { from: 'accounts', localField: 'account', foreignField: '_id', as: 'account' } },
            { $lookup: { from: 'accounts', localField: 'fromaccount', foreignField: '_id', as: 'fromaccount' } },
            { $lookup: { from: 'accounts', localField: 'toaccount', foreignField: '_id', as: 'toaccount' } },
            { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
            { $lookup: { from: 'rollpeople', localField: 'rollperson', foreignField: '_id', as: 'rollperson' } },
            { $set: {
                    account: { $first: '$account' },
                    fromaccount: { $first: '$fromaccount' },
                    toaccount: { $first: '$toaccount' },
                    category: { $first: '$category' },
                    rollperson: { $first: '$rollperson' },
                } },
            { $set: {
                    account: '$account.name',
                    fromaccount: '$fromaccount.name',
                    toaccount: '$toaccount.name',
                    category: '$category.name',
                    rollperson: '$rollperson.name',
                } },
            { $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    total: { $sum: '$amount' },
                    data: { $push: {
                            account: '$account',
                            fromaccount: '$fromaccount',
                            toaccount: '$toaccount',
                            category: '$category',
                            rollperson: '$rollperson',
                            amount: '$amount',
                            type: '$type',
                            _id: '$_id',
                            date: '$date',
                            comment: '$comment',
                        } }
                } },
        ]).exec();
        res.status(200).json(transactions);
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user)
        return res.status(401).end();
    try {
        if (!req.user)
            throw new Error();
        const newTrans = new transaction_1.default(Object.assign(Object.assign({}, req.body), { person: req.user._id }));
        yield newTrans.save();
        if (req.header('content-type'), 'application/x-www-form-urlencoded')
            res.redirect('/newtransaction.html');
        else
            res.status(200).end();
    }
    catch (e) {
        res.status(500).end();
        console.error(e);
    }
}));
exports.default = router;

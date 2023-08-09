import { Router } from 'express'
import TransactionModel from '../models/transaction'

const router = Router();

router.get('/', async(req, res) => {
	try {
		if(!req.user) throw new Error();
		const transactions = await TransactionModel.aggregate([
			{$match: {person: req.user._id}},
			{$sort: {date: -1}},
			{$lookup: {from: 'accounts', localField: 'account', foreignField: '_id', as: 'account'}},
			{$lookup: {from: 'accounts', localField: 'fromaccount', foreignField: '_id', as: 'fromaccount'}},
			{$lookup: {from: 'accounts', localField: 'toaccount', foreignField: '_id', as: 'toaccount'}},
			{$lookup: {from: 'categories', localField: 'category', foreignField: '_id', as: 'category'}},
			{$lookup: {from: 'rollpeople', localField: 'rollperson', foreignField: '_id', as: 'rollperson'}},
			{$set: {
				account: {$first: '$account'},
				fromaccount: {$first: '$fromaccount'},
				toaccount: {$first: '$toaccount'},
				category: {$first: '$category'},
				rollperson: {$first: '$rollperson'},
			}},
			{$set: {
				account: '$account.name',
				fromaccount: '$fromaccount.name',
				toaccount: '$toaccount.name',
				category: '$category.name',
				rollperson: '$rollperson.name',
			}},
			{$group: {
				_id: {$dateToString: {format: '%Y-%m-%d', date: '$date'}},
				total: {$sum: '$amount'},
				data: {$push: {
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
				}}
			}},
		]).exec();
		res.status(200).json(transactions);
	} catch (e) {
		res.status(500).end();
		console.error(e)
	}
})

router.post('/', async(req, res) => {
	if(!req.user) return res.status(401).end();
	try {
		if(!req.user) throw new Error();
		const newTrans = new TransactionModel({...req.body, person: req.user._id});
		await newTrans.save();
		res.status(200).end()
	} catch (e) {
		res.status(500).end();
		console.error(e);
	}
})

export default router;
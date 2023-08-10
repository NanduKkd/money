import { Router } from 'express'
import CategoryModel from '../models/category'
import RollpersonModel from '../models/rollperson'
import AccountModel from '../models/account'

const router = Router();

router.get('/', async(req, res) => {
	if(!req.user)
		return res.status(401).end();
	try {
		const category = await CategoryModel.find({person: req.user._id}).exec()
		const rollperson = await RollpersonModel.find({person: req.user._id}).exec()
		const account = await AccountModel.find({person: req.user._id}).exec()
		res.status(200).json({category, rollperson, account})
	} catch (e) {
		res.status(500).end()
		console.error(e)
	}
})
router.post('/category', async(req, res) => {
	if(!req.user) return res.status(401).end();
	if(!req.body.name) return res.status(400).end();
	try {
		const category = new CategoryModel({person: req.user._id, name: req.body.name})
		await category.save();
		res.status(201).json(category)
	} catch (e) {
		res.status(500).end()
		console.error(e)
	}
})
router.post('/rollperson', async(req, res) => {
	if(!req.user) return res.status(401).end();
	if(!req.body.name) return res.status(400).end();
	try {
		const rollperson = new RollpersonModel({person: req.user._id, name: req.body.name})
		await rollperson.save();
		res.status(201).json(rollperson)
	} catch (e) {
		res.status(500).end()
		console.error(e)
	}
})
router.post('/account', async(req, res) => {
	if(!req.user) return res.status(401).end();
	if(!req.body.name) return res.status(400).end();
	try {
		const account = new AccountModel({person: req.user._id, name: req.body.name})
		await account.save();
		res.status(201).json(account)
	} catch (e) {
		res.status(500).end()
		console.error(e)
	}
})


export default router;
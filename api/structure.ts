import { Router } from 'express'
import CategoryModel from '../models/category'
import RollpersonModel from '../models/rollperson'
import AccountModel from '../models/account'

const router = Router();

router.get('/', async(req, res) => {
	if(!req.user)
		return res.status(401).end();
	try {
		const categories = await CategoryModel.find({person: req.user._id}).exec()
		const rollpeople = await RollpersonModel.find({person: req.user._id}).exec()
		const accounts = await AccountModel.find({person: req.user._id}).exec()
		res.status(200).json({categories, rollpeople, accounts})
	} catch (e) {
		res.status(500).end()
		console.error(e)
	}
})

router.get('/category', async(req, res) => {
	if(!req.user)
		return res.status(401).end();
	try {
		const categories = await CategoryModel.find({person: req.user._id}).exec()
		res.status(200).json(categories)
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
		res.status(201).end()
	} catch (e) {
		res.status(500).end()
		console.error(e)
	}
})

router.get('/rollperson', async(req, res) => {
	if(!req.user)
		return res.status(401).end();
	try {
		const rollpeople = await RollpersonModel.find({person: req.user._id}).exec()
		res.status(200).json(rollpeople)
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
		res.status(201).end()
	} catch (e) {
		res.status(500).end()
		console.error(e)
	}
})

router.get('/account', async(req, res) => {
	if(!req.user)
		return res.status(401).end();
	try {
		const accounts = await AccountModel.find({person: req.user}).exec()
		res.status(200).json(accounts)
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
		res.status(201).end()
	} catch (e) {
		res.status(500).end()
		console.error(e)
	}
})


export default router;
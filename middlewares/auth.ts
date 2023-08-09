import PersonModel from '../models/person'
import { Request, Response, NextFunction } from 'express'

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
	const userDoc = await PersonModel.findOne()
	if(!userDoc) {
		res.status(401).end()
		return;
	}
	req.user = userDoc.toObject();
	next();
}
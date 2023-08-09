import { Request } from 'express'
import { Schema } from 'mongoose'

interface Person {
	_id: Schema.Types.ObjectId,
	name: string,
}

declare global {
	namespace Express {
		export interface Request {
			user?: Person
		}
	}
}
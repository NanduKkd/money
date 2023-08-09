import mongoose from 'mongoose'

type Account = {
	name: string,
	person: mongoose.ObjectId,
}

const accountSchema = new mongoose.Schema<Account>({
	name: {
		type: String,
		required: true,
	},
	person: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
})

export default mongoose.model('account', accountSchema, 'accounts')
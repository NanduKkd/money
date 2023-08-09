import mongoose from 'mongoose'

type transactionBasic = {
	amount: number,
	comment: string,
	date: Date,
	person: mongoose.ObjectId,
}
type realTransaction = transactionBasic & {
	type: 'transaction',
	category: mongoose.ObjectId,
	account: mongoose.ObjectId,
}
type selfTransaction = transactionBasic & {
	type: 'self',
	fromaccount: mongoose.ObjectId,
	toaccount: mongoose.ObjectId,
}
type rollTransaction = transactionBasic & {
	type: 'roll',
	rollperson: mongoose.ObjectId,
	account: mongoose.ObjectId,
}
type Transaction = realTransaction | selfTransaction | rollTransaction;

const transactionSchema = new mongoose.Schema<Transaction>({
	person: {
		type: mongoose.SchemaTypes.ObjectId,
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
		type: mongoose.SchemaTypes.ObjectId,
		required: function(this: Transaction) {
			return this.type==='transaction'
		},
	},
	account: {
		type: mongoose.SchemaTypes.ObjectId,
		required: function(this: Transaction) {
			return this.type==='transaction' || this.type==='roll'
		}
	},
	fromaccount: {
		type: mongoose.SchemaTypes.ObjectId,
		required: function(this: Transaction) {
			return this.type==='self'
		}
	},
	toaccount: {
		type: mongoose.SchemaTypes.ObjectId,
		required: function(this: Transaction) {
			return this.type==='self';
		}
	},
	rollperson: {
		type: mongoose.SchemaTypes.ObjectId,
		required: function(this: Transaction) {
			return this.type==='roll'
		}
	},
})

export default mongoose.model('transaction', transactionSchema, 'transactions')
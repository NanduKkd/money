import mongoose from 'mongoose'

type rollperson = {
	name: string,
	person: mongoose.ObjectId,
}

const rollpersonSchema = new mongoose.Schema<rollperson>({
	name: {
		type: String,
		required: true,
	},
	person: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
})

export default mongoose.model('rollperson', rollpersonSchema, 'rollpeople')
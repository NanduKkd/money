import mongoose from 'mongoose'

type PersonDoc = {
	name: string,
	username: string,
	password: string,
}

const personSchema = new mongoose.Schema<PersonDoc>({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})

export default mongoose.model('person', personSchema, 'people')
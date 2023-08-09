import mongoose from 'mongoose'

type Category = {
	name: string,
	person: mongoose.ObjectId,
}

const categorySchema = new mongoose.Schema<Category>({
	name: {
		type: String,
		required: true,
	},
	person: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
})

export default mongoose.model('category', categorySchema, 'categories')
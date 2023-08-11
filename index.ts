import express, { json, urlencoded } from 'express'
import api from './api'
import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/money').then(() => {
	console.log('mongodb connection established');

}).catch(e => {
	console.log('mongoose could not establish db connection')
	console.error(e)
})
mongoose.connection.on('error', e => {
	console.log('mongoose connection: error occured')
	console.error(e);
})

const app = express();

app.use(json())
app.use(urlencoded())

app.get('/', (req, res) => {
	res.end('Hello World! My name is Nandu!')
})
app.use('/api', api)
app.use(express.static('public'))

app.listen(3001, () => {
	console.log('app listening on port 3001')
})
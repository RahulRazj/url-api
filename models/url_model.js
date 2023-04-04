import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
	token: String,
	originalUrl: String
});

const urlModel = mongoose.model('url', urlSchema);

export default urlModel;

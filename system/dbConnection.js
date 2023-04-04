import mongoose from 'mongoose';

const createDBConnection = async () => {
	try {
		const options = { keepAlive: true, connectTimeoutMS: 30000, useNewUrlParser: true, useUnifiedTopology: true };
		if (!process.env.DB_URL) {
			throw 'DB connection url is missing. Pls contact admin.';
		}

		await mongoose.connect(process.env.DB_URL, options);
		console.log('Connection to database successful');
	} catch (error) {
		console.error('Database connection unsuccessful', error);
		throw error;
	}
};

export default createDBConnection;

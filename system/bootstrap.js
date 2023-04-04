import http from 'http';
import dbConnection from './dbConnection.js';
import dotenv from 'dotenv';
dotenv.config();

export default class Bootstrap {
	constructor(app) {
		this.port = this.normalizePort(process.env.Platform_Port);
		this.server = http.createServer(app);

		this.server.listen(this.port);
		this.server.on('error', this.onError);
		this.server.on('listening', this.onListening);
		this.createDBConnection();
	}

	normalizePort(val) {
		const port = parseInt(val, 10);

		if (isNaN(port)) {
			// named pipe
			return val;
		}
		if (port >= 0) {
			// port number
			return port;
		}

		console.error('Invalid Port', val);
		process.exit();
	}

	createDBConnection() {
		try {
			dbConnection();
		} catch (error) {
			console.error('whoops! There is an issue with connecting DB:', error);
			process.exit(0);
		}
	}

	onError(error) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		let bind = typeof this.port === 'string' ? `Pipe ${this.port}` : `Port ${this.port}`;

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EADDRINUSE':
				console.error(`${bind} is already in use`);
				process.exit(1);
			default:
				throw error;
		}
	}

	onListening() {
		let addr = this.address();
		let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

		console.log(`API App is listening on ${bind}`);
		console.log('Use (Ctrl-C) to shutdown the application..');
	}
}

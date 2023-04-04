import express from 'express';

import BootstrapApp from './system/bootstrap.js';
import RoutesConfig from './routes/index.js';

const app = express();

// Bootstrap Application
new BootstrapApp(app);

app.use(express.json());

process.on('uncaughtException', (err, req) => {
	if (err && err.message !== 'TEST') {
		console.error('whoops! There was an uncaught error', err);
	}
});

process.on('unhandledRejection', function (reason, promise, req) {
	console.error('Unhandled rejection reason', reason);
	console.error('Unhandled rejection promise', promise);
});

RoutesConfig(app);

export default app;

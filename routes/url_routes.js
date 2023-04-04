import express from 'express';
import { getUrl, addUrl } from '../controllers/url_controller.js';

const app = express();

app.get('/:token', getUrl);
app.post('/', addUrl);

export default app
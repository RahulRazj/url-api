import urlModel from '../models/url_model.js';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();
export const getUrl = async (req, res) => {
	try {
		const token = req.params.token;

		if (!token) return res.sendStatus(400);
		const [data] = await urlModel.find({ token });
		if(!data) return res.sendStatus(404);
		return res.send(`<script>window.location.href="${data.originalUrl}";</script>`)
	} catch (error) {
		return res.sendStatus(500).send(error);
	}
};

export const addUrl = async (req, res) => {
	try {
		const url = req.body.url;

		if (!url) throw { code: 400, message: 'Bad Request, Missing url' };

		const token = uid(6);
		const data = await urlModel.create({ token, originalUrl: url });
		return res.send(data);
	} catch (error) {
		return res.sendStatus(400);
	}
};

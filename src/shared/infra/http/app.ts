import express from 'express';

import '@shared/infra/typeorm';

const app = express();

app.get('/', (req, res) => {
	return res.json({ hello: 'World' });
});

export default app;

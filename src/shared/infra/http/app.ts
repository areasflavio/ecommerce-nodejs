import 'reflect-metadata';

import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'express-async-errors';

import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	return res.json({ hello: 'World' });
});

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	console.log(err);

	return response.status(500).json({
		status: 'error',
		message: 'Internal Server Error',
	});
});

export default app;

import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeProductRepository from '../repositories/fakes/FakeProductRepository';
import CreateProductService from './CreateProductService';

let createProduct: CreateProductService;
let fakeProductsRepository: FakeProductRepository;

describe('CreateProducts', () => {
	beforeEach(async () => {
		fakeProductsRepository = new FakeProductRepository();

		createProduct = new CreateProductService(fakeProductsRepository);
	});

	it('should be able to create a new product', async () => {
		const product = await createProduct.execute({
			name: 'Computer',
			price: 1234.5,
			quantity: 10,
		});

		expect(product).toHaveProperty('id');
	});

	it('should not be able to create a product thats already registered', async () => {
		await createProduct.execute({
			name: 'Computer',
			price: 1234.5,
			quantity: 10,
		});

		await expect(
			createProduct.execute({
				name: 'Computer',
				price: 1234.5,
				quantity: 10,
			})
		).rejects.toBeInstanceOf(AppError);
	});
});

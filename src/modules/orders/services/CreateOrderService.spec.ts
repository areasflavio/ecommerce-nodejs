import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import FakeCustomerRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import CreateOrderService from './CreateOrderService';

let createOrder: CreateOrderService;
let fakeOrderRepository: FakeOrderRepository;
let fakeProductRepository: FakeProductRepository;
let fakeCustomerRepository: FakeCustomerRepository;

describe('CreateOrder', () => {
	beforeEach(async () => {
		fakeOrderRepository = new FakeOrderRepository();
		fakeProductRepository = new FakeProductRepository();
		fakeCustomerRepository = new FakeCustomerRepository();

		createOrder = new CreateOrderService(
			fakeOrderRepository,
			fakeProductRepository,
			fakeCustomerRepository
		);
	});

	it('should be able to create a new order', async () => {
		const customer = await fakeCustomerRepository.create(
			'John Doe',
			'johndoe@example.com'
		);

		const product1 = await fakeProductRepository.create({
			name: 'Computer',
			price: 1234.5,
			quantity: 10,
		});

		const product2 = await fakeProductRepository.create({
			name: 'Keyboard',
			price: 123.4,
			quantity: 5,
		});

		const order = await createOrder.execute({
			customer_id: customer.id,
			products: [
				{ id: product1.id, quantity: 1 },
				{ id: product2.id, quantity: 1 },
			],
		});

		expect(order).toHaveProperty('id');
	});

	it('should not be able to create an order with a invalid customer', async () => {
		const product1 = await fakeProductRepository.create({
			name: 'Computer',
			price: 1234.5,
			quantity: 10,
		});

		const product2 = await fakeProductRepository.create({
			name: 'Keyboard',
			price: 123.4,
			quantity: 5,
		});

		await expect(
			createOrder.execute({
				customer_id: 'invalid-customer-id',
				products: [
					{ id: product1.id, quantity: 1 },
					{ id: product2.id, quantity: 1 },
				],
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an order with invalid products', async () => {
		const customer = await fakeCustomerRepository.create(
			'John Doe',
			'johndoe@example.com'
		);

		const product1 = await fakeProductRepository.create({
			name: 'Computer',
			price: 1234.5,
			quantity: 10,
		});

		await expect(
			createOrder.execute({
				customer_id: customer.id,
				products: [
					{ id: product1.id, quantity: 1 },
					{ id: 'invalid-product-id', quantity: 1 },
				],
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an order with products with insufficient quantities', async () => {
		const customer = await fakeCustomerRepository.create(
			'John Doe',
			'johndoe@example.com'
		);

		const product1 = await fakeProductRepository.create({
			name: 'Computer',
			price: 1234.5,
			quantity: 10,
		});

		const product2 = await fakeProductRepository.create({
			name: 'Keyboard',
			price: 123.4,
			quantity: 5,
		});

		await expect(
			createOrder.execute({
				customer_id: customer.id,
				products: [
					{ id: product1.id, quantity: 1 },
					{ id: product2.id, quantity: 6 },
				],
			})
		).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to subtract an product total quantity when it is ordered', async () => {
		const customer = await fakeCustomerRepository.create(
			'John Doe',
			'johndoe@example.com'
		);

		const product1 = await fakeProductRepository.create({
			name: 'Computer',
			price: 1234.5,
			quantity: 10,
		});

		const product2 = await fakeProductRepository.create({
			name: 'Keyboard',
			price: 123.4,
			quantity: 5,
		});

		await createOrder.execute({
			customer_id: customer.id,
			products: [
				{ id: product1.id, quantity: 1 },
				{ id: product2.id, quantity: 1 },
			],
		});

		const updatedProduct1 = await fakeProductRepository.findByName(
			product1.name
		);

		expect(updatedProduct1).toEqual(
			expect.objectContaining({
				quantity: 9,
			})
		);
	});
});

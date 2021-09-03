import 'reflect-metadata';

import AppError from '@shared/errors/AppError';

import FakeCustomerRepository from '../repositories/fakes/FakeCustomerRepository';
import CreateCustomerService from './CreateCustomerService';

let createCustomer: CreateCustomerService;
let fakeCustomersRepository: FakeCustomerRepository;

describe('CreateCustomers', () => {
	beforeEach(async () => {
		fakeCustomersRepository = new FakeCustomerRepository();

		createCustomer = new CreateCustomerService(fakeCustomersRepository);
	});

	it('should be able to create a new customer', async () => {
		const customer = await createCustomer.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		expect(customer).toHaveProperty('id');
	});

	it('should not be able to create a customer with one email thats already registered', async () => {
		await createCustomer.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
		});

		await expect(
			createCustomer.execute({
				name: 'John Doe',
				email: 'johndoe@example.com',
			})
		).rejects.toBeInstanceOf(AppError);
	});
});

import 'reflect-metadata';

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
});

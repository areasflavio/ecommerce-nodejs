import { v4 as uuid } from 'uuid';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import Customer from '../../infra/typeorm/entities/Customer';

class CustomersRepository implements ICustomersRepository {
	private customers: Customer[] = [];

	public async create(name: string, email: string): Promise<Customer> {
		const customer = new Customer();

		Object.assign(customer, { id: uuid(), name, email });

		this.customers.push(customer);

		return customer;
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		const findCustomer = this.customers.find(
			customer => customer.email === email
		);

		return findCustomer;
	}

	public async findById(id: string): Promise<Customer | undefined> {
		const findCustomer = this.customers.find(customer => customer.id === id);

		return findCustomer;
	}
}

export default CustomersRepository;

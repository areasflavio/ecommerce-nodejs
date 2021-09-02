import { getRepository, Repository } from 'typeorm';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Customer from '../entities/Customer';

class CustomerRepository implements ICustomersRepository {
	private ormRepository: Repository<Customer>;

	constructor() {
		this.ormRepository = getRepository(Customer);
	}

	public async create(name: string, email: string): Promise<Customer> {
		const customer = this.ormRepository.create({ name, email });

		await this.ormRepository.save(customer);

		return customer;
	}

	public async findByEmail(email: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne({
			where: { email },
		});

		return customer;
	}

	public async findById(id: string): Promise<Customer | undefined> {
		const customer = await this.ormRepository.findOne(id);

		return customer;
	}
}

export default CustomerRepository;

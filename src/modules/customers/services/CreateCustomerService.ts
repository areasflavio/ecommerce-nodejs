import { inject, injectable } from 'tsyringe';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
	name: string;
	email: string;
}

@injectable()
class CreateCustomerService {
	constructor(
		@inject('CustomersRepository')
		private customersRepository: ICustomersRepository
	) {}

	public async execute({ email, name }: IRequest): Promise<Customer> {
		const customer = await this.customersRepository.create(name, email);

		return customer;
	}
}

export default CreateCustomerService;

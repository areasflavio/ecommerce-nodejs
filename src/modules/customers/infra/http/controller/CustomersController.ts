import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

class CustomersController {
	constructor() {}

	public async create(request: Request, response: Response): Promise<Response> {
		const { email, name } = request.body;

		const createCustomer = container.resolve(CreateCustomerService);

		const customer = await createCustomer.execute({
			email,
			name,
		});

		return response.json(customer);
	}
}

export default CustomersController;

import Customer from '@modules/customers/infra/typeorm/entities/Customer';

export default interface ICustomersRepository {
	create(name: string, email: string): Promise<Customer>;
	findByEmail(email: string): Promise<Customer | undefined>;
	findById(id: string): Promise<Customer | undefined>;
}

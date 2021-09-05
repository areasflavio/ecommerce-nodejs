import Customer from '@modules/customers/infra/typeorm/entities/Customer';

interface IProduct {
	id: string;
	quantity: number;
}

export default interface ICreateOrderDTO {
	customer: Customer;
	products: IProduct[];
}

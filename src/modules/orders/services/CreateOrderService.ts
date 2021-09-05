import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';

import Order from '../infra/typeorm/entities/Order';

interface IRequestProduct {
	id: string;
	quantity: number;
}

interface IRequest {
	customer_id: string;
	products: IRequestProduct[];
}

@injectable()
class CreateOrderService {
	constructor(
		@inject('OrdersRepository')
		private ordersRepository: IOrdersRepository,

		@inject('ProductsRepository')
		private productsRepository: IProductsRepository,

		@inject('CustomersRepository')
		private customerRepository: ICustomersRepository
	) {}

	public async execute({ customer_id, products }: IRequest): Promise<Order> {
		const customerExists = await this.customerRepository.findById(customer_id);

		if (!customerExists) {
			throw new AppError('This customer does not exists');
		}

		const existentProducts = await this.productsRepository.findAllById(
			products
		);

		const existentProductsIds = existentProducts.map(product => product.id);

		const inexistentProducts = products.filter(
			product => !existentProductsIds.includes(product.id)
		);

		if (inexistentProducts.length) {
			throw new AppError(
				`This product do not exist: ${inexistentProducts[0].id}`
			);
		}

		const productsWithUnavailableQuantity = products.filter(
			product =>
				existentProducts.filter(
					existProduct => existProduct.id === product.id
				)[0].quantity <= product.quantity
		);

		if (productsWithUnavailableQuantity.length) {
			throw new AppError(
				`This product does not have enough quantity: ${productsWithUnavailableQuantity[0].id}`
			);
		}

		const serializedProducts = products.map(product => ({
			product_id: product.id,
			quantity: product.quantity,
			price: existentProducts.filter(p => p.id === product.id)[0].price,
		}));

		const order = await this.ordersRepository.create({
			customer: customerExists,
			products: serializedProducts,
		});

		const orderedProductsQuantity = products.map(product => ({
			id: product.id,
			quantity:
				existentProducts.filter(p => p.id === product.id)[0].quantity -
				product.quantity,
		}));

		await this.productsRepository.updateQuantity(orderedProductsQuantity);

		return order;
	}
}

export default CreateOrderService;

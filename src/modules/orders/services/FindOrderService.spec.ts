import 'reflect-metadata';

import FakeProductRepository from '@modules/products/repositories/fakes/FakeProductRepository';
import FakeCustomerRepository from '@modules/customers/repositories/fakes/FakeCustomerRepository';
import FakeOrderRepository from '../repositories/fakes/FakeOrderRepository';
import FindOrderService from './FindOrderService';
import CreateOrderService from './CreateOrderService';

let createOrder: CreateOrderService;
let findOrder: FindOrderService;
let fakeOrderRepository: FakeOrderRepository;
let fakeProductRepository: FakeProductRepository;
let fakeCustomerRepository: FakeCustomerRepository;

describe('FindOrder', () => {
	beforeEach(async () => {
		fakeOrderRepository = new FakeOrderRepository();
		fakeProductRepository = new FakeProductRepository();
		fakeCustomerRepository = new FakeCustomerRepository();

		createOrder = new CreateOrderService(
			fakeOrderRepository,
			fakeProductRepository,
			fakeCustomerRepository
		);

		findOrder = new FindOrderService(fakeOrderRepository);
	});

	it('should be able to list one specific order', async () => {
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

		const foundOrder = await findOrder.execute({
			id: order.id,
		});

		await expect(foundOrder).toEqual(order);
	});
});

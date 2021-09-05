import { v4 as uuid } from 'uuid';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import Order from '../../infra/typeorm/entities/Order';

import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';

class OrdersRepository implements IOrdersRepository {
	private orders: Order[] = [];

	public async create(data: ICreateOrderDTO): Promise<Order> {
		const order = new Order();

		Object.assign(order, { id: uuid() }, data);

		this.orders.push(order);

		return order;
	}

	public async findById(id: string): Promise<Order | undefined> {
		const findOrder = this.orders.find(order => order.id === id);

		return findOrder;
	}
}

export default OrdersRepository;

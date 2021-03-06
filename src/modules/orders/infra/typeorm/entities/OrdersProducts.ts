import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('order_products')
class OrdersProducts {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	order_id: string;

	@ManyToOne(() => Order, order => order.order_products)
	@JoinColumn({ name: 'order_id' })
	order: Order;

	@Column()
	product_id: string;

	@ManyToOne(() => Product, product => product.order_products)
	@JoinColumn({ name: 'product_id' })
	product: Product;

	@Column('decimal')
	price: number;

	@Column('int')
	quantity: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}

export default OrdersProducts;

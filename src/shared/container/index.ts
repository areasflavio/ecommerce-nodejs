import { container } from 'tsyringe';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

container.registerSingleton<ICustomersRepository>(
	'CustomersRepository',
	CustomersRepository
);

container.registerSingleton<IProductsRepository>(
	'ProductsRepository',
	ProductsRepository
);

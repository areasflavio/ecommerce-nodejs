import { v4 as uuid } from 'uuid';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '../../infra/typeorm/entities/Product';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProducts from '@modules/products/dtos/IFindProducts';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';

class ProductsRepository implements IProductsRepository {
	private products: Product[] = [];

	public async create(data: ICreateProductDTO): Promise<Product> {
		const product = new Product();

		Object.assign(product, { id: uuid() }, data);

		this.products.push(product);

		return product;
	}

	public async findByName(name: string): Promise<Product | undefined> {
		const findProduct = this.products.find(product => product.name === name);

		return findProduct;
	}

	public async findAllById(products: IFindProducts[]): Promise<Product[]> {
		throw new Error('Method not implemented.');
	}

	public async updateQuantity(
		products: IUpdateProductsQuantityDTO[]
	): Promise<Product[]> {
		throw new Error('Method not implemented.');
	}
}

export default ProductsRepository;

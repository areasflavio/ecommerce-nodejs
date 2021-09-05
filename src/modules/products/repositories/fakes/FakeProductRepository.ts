import { v4 as uuid } from 'uuid';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '../../infra/typeorm/entities/Product';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProducts from '@modules/products/dtos/IFindProducts';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';

class ProductsRepository implements IProductsRepository {
	private repositoryProducts: Product[] = [];

	public async create(data: ICreateProductDTO): Promise<Product> {
		const product = new Product();

		Object.assign(product, { id: uuid() }, data);

		this.repositoryProducts.push(product);

		return product;
	}

	public async findByName(name: string): Promise<Product | undefined> {
		const findProduct = this.repositoryProducts.find(
			product => product.name === name
		);

		return findProduct;
	}

	public async findAllById(products: IFindProducts[]): Promise<Product[]> {
		const productsIds = products.map(product => product.id);

		const findProducts = this.repositoryProducts.filter(repoProduct =>
			productsIds.includes(repoProduct.id)
		);

		return findProducts;
	}

	public async updateQuantity(
		products: IUpdateProductsQuantityDTO[]
	): Promise<Product[]> {
		this.repositoryProducts.forEach(repoProduct =>
			products.forEach(product => {
				if (product.id === repoProduct.id)
					repoProduct.quantity = product.quantity;
			})
		);

		return this.repositoryProducts;
	}
}

export default ProductsRepository;

import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product from '../entities/Product';

import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindProducts from '@modules/products/dtos/IFindProducts';

class ProductRepository implements IProductsRepository {
	private ormRepository: Repository<Product>;

	constructor() {
		this.ormRepository = getRepository(Product);
	}

	public async create({
		name,
		price,
		quantity,
	}: ICreateProductDTO): Promise<Product> {
		const product = this.ormRepository.create({ name, price, quantity });

		await this.ormRepository.save(product);

		return product;
	}

	public async findByName(name: string): Promise<Product | undefined> {
		const product = await this.ormRepository.findOne({
			where: { name },
		});

		return product;
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

export default ProductRepository;
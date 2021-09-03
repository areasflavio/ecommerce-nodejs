import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateProductDTO from '../dtos/ICreateProductDTO';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class CreateProductService {
	constructor(
		@inject('ProductsRepository')
		private productsRepository: IProductsRepository
	) {}

	public async execute({
		name,
		price,
		quantity,
	}: ICreateProductDTO): Promise<Product> {
		const productExists = await this.productsRepository.findByName(name);

		if (productExists) {
			throw new AppError('This product is already registered');
		}

		const product = await this.productsRepository.create({
			name,
			price,
			quantity,
		});

		return product;
	}
}

export default CreateProductService;

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CatalogService {
    // In-memory array to store products
    private products: Product[] = [];

    async findAll(): Promise<Product[]> {
        return this.products;
    }

    async findOne(id: string): Promise<Product> {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product: Product = {
            id: uuidv4(),
            name: createProductDto.name,
            description: createProductDto.description,
            price: createProductDto.price,
        };
        this.products.push(product);
        return product;
    }
}

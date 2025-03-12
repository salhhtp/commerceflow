import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Get()
    async findAll() {
        return await this.catalogService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.catalogService.findOne(id);
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.catalogService.create(createProductDto);
    }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
    // In-memory orders array
    private orders: Order[] = [];

    async findAll(): Promise<Order[]> {
        return this.orders;
    }

    async findOne(id: string): Promise<Order> {
        const order = this.orders.find(o => o.id === id);
        if (!order) {
            throw new NotFoundException(`Order with id ${id} not found`);
        }
        return order;
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const order: Order = {
            id: uuidv4(),
            productIds: createOrderDto.productIds,
            totalAmount: createOrderDto.totalAmount,
            status: 'created'
        };
        this.orders.push(order);
        return order;
    }
}

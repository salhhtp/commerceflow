import { IsArray, IsNumber, ArrayNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsArray()
    @ArrayNotEmpty()
    readonly productIds!: string[];

    @IsNumber()
    readonly totalAmount!: number;
}

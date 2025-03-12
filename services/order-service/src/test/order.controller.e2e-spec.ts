import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('OrderController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET orders should return an empty array initially', () => {
        return request(app.getHttpServer())
            .get('/orders')
            .expect(200)
            .expect([]);
    });

    it('/POST orders should create an order', async () => {
        const orderDto = {
            productIds: ['prod1', 'prod2'],
            totalAmount: 150.00,
        };

        const response = await request(app.getHttpServer())
            .post('/orders')
            .send(orderDto)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.productIds).toEqual(orderDto.productIds);
        expect(response.body.totalAmount).toEqual(orderDto.totalAmount);
        expect(response.body.status).toEqual('created');
    });

    it('/GET orders should return an array with the created order', async () => {
        const response = await request(app.getHttpServer())
            .get('/orders')
            .expect(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    afterAll(async () => {
        await app.close();
    });
});

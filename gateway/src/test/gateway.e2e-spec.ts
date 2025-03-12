import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import axios, { AxiosResponse } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GatewayController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        // For tests, ensure environment variables point to localhost
        process.env.CATALOG_SERVICE_HOST = 'localhost';
        process.env.ORDER_SERVICE_HOST = 'localhost';

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should proxy POST /catalog/products and then GET /catalog/products', async () => {
        // Mock the POST request to return a created product
        mockedAxios.post.mockResolvedValueOnce({
            status: 201,
            data: {
                id: 'test-id',
                name: 'Gateway Catalog Test',
                description: 'Testing Catalog via Gateway',
                price: 59.99,
            },
        } as AxiosResponse);

        // Mock the GET request to return a list with the created product
        mockedAxios.get.mockResolvedValueOnce({
            status: 200,
            data: [{
                id: 'test-id',
                name: 'Gateway Catalog Test',
                description: 'Testing Catalog via Gateway',
                price: 59.99,
            }],
        } as AxiosResponse);

        // Test POST /catalog/products via the gateway
        await request(app.getHttpServer())
            .post('/catalog/products')
            .send({
                name: 'Gateway Catalog Test',
                description: 'Testing Catalog via Gateway',
                price: 59.99,
            })
            .expect(201);

        // Test GET /catalog/products via the gateway
        const response = await request(app.getHttpServer())
            .get('/catalog/products')
            .expect(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should proxy POST /orders and then GET /orders', async () => {
        // Mock the POST request for order creation
        mockedAxios.post.mockResolvedValueOnce({
            status: 201,
            data: {
                id: 'order-test-id',
                productIds: ['testProd1'],
                totalAmount: 100.00,
                status: 'created',
            },
        } as AxiosResponse);

        // Mock the GET request for orders
        mockedAxios.get.mockResolvedValueOnce({
            status: 200,
            data: [{
                id: 'order-test-id',
                productIds: ['testProd1'],
                totalAmount: 100.00,
                status: 'created',
            }],
        } as AxiosResponse);

        // Test POST /orders via the gateway
        await request(app.getHttpServer())
            .post('/orders')
            .send({
                productIds: ['testProd1'],
                totalAmount: 100.00,
            })
            .expect(201);

        // Test GET /orders via the gateway
        const response = await request(app.getHttpServer())
            .get('/orders')
            .expect(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    afterAll(async () => {
        await app.close();
    });
});

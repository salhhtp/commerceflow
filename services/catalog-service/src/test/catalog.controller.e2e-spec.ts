import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../app.module';

describe('CatalogController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/GET products should return an empty array initially', () => {
        return request(app.getHttpServer())
            .get('/products')
            .expect(200)
            .expect([]);
    });

    it('/POST products should create a product', async () => {
        const productDto = {
            name: 'Test Product',
            description: 'Test Description',
            price: 10.0,
        };

        const response = await request(app.getHttpServer())
            .post('/products')
            .send(productDto)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toEqual(productDto.name);
        expect(response.body.description).toEqual(productDto.description);
        expect(response.body.price).toEqual(productDto.price);
    });

    it('/GET products should return an array with the created product', async () => {
        const response = await request(app.getHttpServer())
            .get('/products')
            .expect(200);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    afterAll(async () => {
        await app.close();
    });
});

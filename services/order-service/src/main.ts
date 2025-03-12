import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3002);
    console.log('Order Service is running on http://localhost:3002');
}
bootstrap();

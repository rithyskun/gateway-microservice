import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

const USER = process.env.RABBITMQ_USER;
const PASSWORD = process.env.RABBITMQ_PASS;
const HOST = process.env.RABBITMQ_HOST;

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://user:password@localhost:5672`],
      queue: 'AUTH_QUEUE',
      queueOptions: {
        durable: true, // queue survives broker restart
      },
    },
  });
  await app.listen();
}
bootstrap();

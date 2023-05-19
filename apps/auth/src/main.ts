import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

const USER = process.env.RABBITMQ_USER;
const PASSWORD = process.env.RABBITMQ_PASS;
const HOST = process.env.RABBITMQ_HOST;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        queue: 'AUTH_QUEUE',
        queueOptions: {
          durable: true, // queue survives broker restart
        },
      },
    },
  );
  await app.listen();
}
bootstrap();

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const USER = process.env.RABBITMQ_USER;
const PASSWORD = process.env.RABBITMQ_PASS;
const HOST = process.env.RABBITMQ_HOST;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
          queue: 'USERS_QUEUE',
          queueOptions: {
            durable: true, // queue survives broker restart
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

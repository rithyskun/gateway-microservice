import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

const USER = process.env.RABBITMQ_USER;
const PASSWORD = process.env.RABBITMQ_PASS;
const HOST = process.env.RABBITMQ_HOST;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
          queue: 'AUTH_QUEUE',
          queueOptions: {
            durable: true, // queue survives broker restart
          },
        },
      },
    ]),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}

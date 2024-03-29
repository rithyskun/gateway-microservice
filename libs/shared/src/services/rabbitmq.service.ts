import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
import { RabbitMqServiceInterface } from '../interfaces/rabbitmq.service.interface';

@Injectable()
export class RabbitMqService implements RabbitMqServiceInterface {
  constructor(private readonly configService: ConfigService) {}

  getRmqOptions(queue: string, noAck = false): RmqOptions {
    const USER = this.configService.get('RABBITMQ_USER');
    const PASSWORD = this.configService.get('RABBITMQ_PASS');
    const HOST = this.configService.get('RABBITMQ_HOST');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
        noAck,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }
  acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}

import { RmqContext, RmqOptions } from '@nestjs/microservices';

export interface RabbitMqServiceInterface {
  getRmqOptions(queue: string, noAck?: boolean): RmqOptions;
  acknowledgeMessage(context: RmqContext): void;
}

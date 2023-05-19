import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { RabbitMqService } from '@app/shared';

const port = process.env.NOTIFICATION_PORT;

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);

  const rmqService = app.get<RabbitMqService>(RabbitMqService);

  app.connectMicroservice(rmqService.getRmqOptions('NOTIFICATION_QUEUE', true));
  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();

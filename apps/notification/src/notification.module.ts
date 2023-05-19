import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RabbitMqModule.registerRmq('AUTH_SERVICE', 'AUTH_QUEUE'),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}

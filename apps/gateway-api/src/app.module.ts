import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/user.controller';
import { AuthController } from './auth/auth.controller';
import { RabbitMqModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RabbitMqModule.registerRmq('AUTH_SERVICE', 'AUTH_QUEUE'),
    RabbitMqModule.registerRmq('NOTIFICATION_SERVICE', 'NOTIFICATION_QUEUE'),
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}

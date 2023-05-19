import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RabbitMqModule } from '@app/shared';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RabbitMqModule.registerRmq('NOTIFICATION_SERVICE', 'NOTIFICATION_QUEUE'),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

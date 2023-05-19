import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @MessagePattern('register_user_notification')
  getHello(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log(data);
    console.log(context);

    this.notificationService.getHello();
  }
}

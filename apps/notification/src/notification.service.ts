import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly notifcationClient: ClientProxy,
  ) {}
  getHello() {
    return this.notifcationClient.emit('register_success', 'successfully');
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly client: ClientProxy) {}
  handleLogin(payload: any) {
    return this.client.send({ cmd: 'resLogin' }, payload);
  }
}

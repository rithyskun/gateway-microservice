import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  login(payload: any) {
    const { email, password } = payload.body;

    return this.authClient.send({ cmd: 'login' }, { email, password });
  }

  signup(req: any): any {
    const { email, password, name } = req.body;
    return this.authClient.send({ cmd: 'signup' }, { email, password, name });
  }
}

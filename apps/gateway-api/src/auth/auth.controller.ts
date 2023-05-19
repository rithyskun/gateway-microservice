import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from 'libs/shared/src';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  @Post('login')
  login(@Body() body: LoginDto) {
    const { email, password } = body;
    return this.authClient.send({ cmd: 'login' }, { email, password });
  }

  @EventPattern('getUsers')
  getUsers(payload: any) {
    console.log(payload);
  }

  @Post('signup')
  signup(@Body() body: SignupDto) {
    const { email } = body;
    return this.authClient.send({ cmd: 'signup' }, { email });
  }
}

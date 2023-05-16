import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from 'libs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() body: RegisterUserDto) {
    const { email, password, name, status } = body;

    return this.userClient.send(
      { cmd: 'register' },
      { email, password, name, status },
    );
  }
}

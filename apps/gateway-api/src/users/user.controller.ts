import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from 'libs';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() body: CreateUserDto) {
    const { firstName, lastName, email, password, status, roles } = body;
    return this.authClient.send(
      { cmd: 'register' },
      { firstName, lastName, email, password, status, roles },
    );
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RegisterUserDto } from 'libs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}
  users = [
    {
      email: 'rithy.skun@outlook.com',
      password: '123456789',
    },
  ];
  handleValidation(payload: any) {
    const { email, password } = payload;

    const isValid = this.users.find(
      (e) => e.email === email && e.password === password,
    );

    if (!isValid) return false;
    this.users.push(payload);
    this.authClient.emit('getUsers', this.users);

    return this.users;
  }

  async register(payload: RegisterUserDto): Promise<RegisterUserDto> {
    console.log(payload);
    return {
      ...payload,
    };
  }
}

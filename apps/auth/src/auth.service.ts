import { Injectable } from '@nestjs/common';
import { LoginDto } from '@app/shared';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async handleLogin(payload: LoginDto): Promise<LoginDto> {
    return payload;
  }
}

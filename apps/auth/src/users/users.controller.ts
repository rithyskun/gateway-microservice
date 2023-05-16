import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'libs';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'register' })
  async handleRegister(userRegister: CreateUserDto): Promise<CreateUserDto> {
    return await this.usersService.create(userRegister);
  }
}

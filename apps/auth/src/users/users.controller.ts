import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { RegisterUserDto } from 'libs';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'resLogin' })
  userValidation(payload: any) {
    return this.usersService.handleValidation(payload);
  }

  @MessagePattern({ cmd: 'register' })
  async handleRegister(
    userRegister: RegisterUserDto,
  ): Promise<RegisterUserDto> {
    return await this.usersService.register(userRegister);
  }
}

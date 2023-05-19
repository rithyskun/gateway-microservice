import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from '@app/shared';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  handleLogin(payload: LoginDto) {
    return this.authService.handleLogin(payload);
  }

  @EventPattern('getUsers')
  getUsers(payload: any) {
    console.log(payload);
  }

  @EventPattern('register_success')
  registerSuccess(@Payload() data: string): string {
    console.log(data);
    return data;
  }
}

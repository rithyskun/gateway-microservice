import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  handleLogin(payload: any) {
    return this.authService.handleLogin(payload);
  }

  @EventPattern('getUsers')
  getUsers(payload: any) {
    console.log(payload);
  }
}

import { Controller, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(@Req() req): any {
    return this.appService.login(req);
  }

  @EventPattern('getUsers')
  getUsers(payload: any) {
    console.log(payload);
  }

  @Post('signup')
  signup(@Req() req): any {
    return this.appService.signup(req);
  }
}

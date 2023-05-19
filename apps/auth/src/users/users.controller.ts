import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@app/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: 'register' })
  async handleRegister(userRegister: CreateUserDto): Promise<CreateUserDto> {
    return await this.usersService.create(userRegister);
  }

  @MessagePattern({ cmd: 'queryUsers' })
  async findAll(@Payload() query?: string): Promise<User[]> {
    return await this.usersService.findAll(query);
  }

  @MessagePattern({ cmd: 'findOneUser' })
  async findOne(@Payload() id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}

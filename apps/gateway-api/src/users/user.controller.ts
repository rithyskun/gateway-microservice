import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import {
  ApiQuery,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from 'apps/auth/src/users/entities/user.entity';
import { CreateUserDto } from '@app/shared';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ type: User })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiConflictResponse()
  @ApiBadRequestResponse({ description: 'Bad request' })
  register(@Body() body: CreateUserDto) {
    const { firstName, lastName, email, password, status, roles } = body;
    return this.authClient.send(
      { cmd: 'register' },
      { firstName, lastName, email, password, status, roles },
    );
  }

  @Get()
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
    description: 'Query with email or first name',
  })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiUnauthorizedResponse()
  queryUsers(@Query('query') query?: string) {
    return this.authClient.send({ cmd: 'queryUsers' }, query);
  }

  @Get(':id')
  @ApiOkResponse({
    status: 200,
    description: 'The user found',
    type: User,
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authClient.send({ cmd: 'findOneUser' }, id);
  }
}

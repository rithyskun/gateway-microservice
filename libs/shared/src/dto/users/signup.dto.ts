import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SignupDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}

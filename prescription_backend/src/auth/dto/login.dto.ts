import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'jean@chu.mg' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test1234' })
  @IsString()
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'jean@chu.mg' })
  email: string;

  @ApiProperty({ example: 'test1234' })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'RAKOTO' })
  @IsString()
  nom: string;

  @ApiProperty({ example: 'Jean' })
  @IsString()
  prenoms: string;

  @ApiProperty({ example: 'jean@chu.mg' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test1234' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'Médecin' })
  @IsString()
  poste: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  matricule?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  numeroOrdre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  ordre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  telephone?: string;
}

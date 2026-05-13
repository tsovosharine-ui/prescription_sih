import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'RAKOTO' })
  nom: string;

  @ApiProperty({ example: 'Jean' })
  prenoms: string;

  @ApiProperty({ example: 'jean@chu.mg' })
  email: string;

  @ApiProperty({ example: 'test1234' })
  password: string;

  @ApiProperty({ example: 'Médecin' })
  poste: string;

  @ApiProperty({ required: false })
  matricule?: string;

  @ApiProperty({ required: false })
  numeroOrdre?: string;

  @ApiProperty({ required: false })
  ordre?: string;

  @ApiProperty({ required: false })
  telephone?: string;
}

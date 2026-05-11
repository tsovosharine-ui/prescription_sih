import { IsString, IsOptional } from 'class-validator';

export class CreateEndoscopieDto {
  @IsString() patientId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() renseignements: string;
  @IsString() typeExamen: string;
  @IsOptional() @IsString() remarques?: string;
}

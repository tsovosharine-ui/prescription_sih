import { IsString, IsOptional } from 'class-validator';

export class CreateEEGDto {
  @IsString() patientId: string;
  @IsString() prescripteurId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() renseignements: string;
  @IsString() typeEEG: string;
  @IsOptional() @IsString() remarques?: string;
}

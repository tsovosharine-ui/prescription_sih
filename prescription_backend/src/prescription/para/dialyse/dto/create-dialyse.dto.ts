import { IsString, IsOptional } from 'class-validator';

export class CreateDialyseDto {
  @IsString() patientId: string;
  @IsString() prescripteurId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() renseignements: string;
  @IsString() typeDialyse: string;
  @IsOptional() @IsString() remarques?: string;
}

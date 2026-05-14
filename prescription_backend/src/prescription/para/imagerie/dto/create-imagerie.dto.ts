import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateImagerieDto {
  @IsString() patientId: string;
  @IsString() prescripteurId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() renseignements: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsObject() examens?: any;
}

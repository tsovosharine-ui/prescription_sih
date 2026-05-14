import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateLaboDto {
  @IsString() patientId: string;
  @IsString() prescripteurId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() renseignements: string;
  @IsArray() @IsString({ each: true }) analyses: string[];
  @IsOptional() @IsString() notes?: string;
}

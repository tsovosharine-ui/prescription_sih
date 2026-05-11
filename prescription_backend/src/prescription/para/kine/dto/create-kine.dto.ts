import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateKineDto {
  @IsString() patientId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() renseignements: string;
  @IsString() typeKine: string;
  @IsOptional() @IsString() diagnostic?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) contreIndications?: string[];
  @IsOptional() @IsString() objectifs?: string;
  @IsOptional() @IsString() remarques?: string;
}

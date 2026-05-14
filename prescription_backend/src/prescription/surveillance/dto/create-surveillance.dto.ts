import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ParametreDto {
  @IsString() parametre: string;
  @IsString() frequence: string;
  @IsOptional() @IsString() duree?: string;
  @IsOptional() @IsString() seuil?: string;
}

export class CreateSurveillanceDto {
  @IsString() patientId: string;
  @IsString() prescripteurId: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsBoolean() notifierInfirmier?: boolean;
  @IsArray() @ValidateNested({ each: true }) @Type(() => ParametreDto) parametres: ParametreDto[];
}

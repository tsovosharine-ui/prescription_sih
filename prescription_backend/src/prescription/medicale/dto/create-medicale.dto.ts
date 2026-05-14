import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class MedicamentDto {
  @IsString()
  nom: string;

  @IsString()
  dose: string;

  @IsNumber()
  quantite: number;

  @IsOptional()
  @IsString()
  voie?: string;

  @IsString()
  frequence: string;

  @IsString()
  duree: string;

  @IsOptional()
  @IsDateString()
  dateDebut?: string;

  @IsOptional()
  @IsString()
  heureDebut?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  remarques?: string;
}

export class CreateMedicaleDto {
  @IsString()
  patientId: string;
  @IsString()
  prescripteurId: string;

  @IsOptional()
  @IsString()
  remarques?: string;

  @IsOptional()
  @IsBoolean()
  notifierInfirmier?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedicamentDto)
  medicaments: MedicamentDto[];
}

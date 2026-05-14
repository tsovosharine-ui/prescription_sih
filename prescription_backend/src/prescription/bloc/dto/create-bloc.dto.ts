import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateBlocDto {
  @IsString() patientId: string;
  @IsString() prescripteurId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() libelle: string;
  @IsOptional() @IsString() risqueHemorragique?: string;
  @IsOptional() @IsString() typeChirurgie?: string;
  @IsOptional() @IsString() chirurgien?: string;
  @IsOptional() @IsString() consignes?: string;
  @IsOptional() @IsDateString() dateIntervention?: string;
}

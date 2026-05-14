import { IsString, IsOptional, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class CreateTransfusionDto {
  @IsString() patientId: string;
  @IsString() prescripteurId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() renseignements: string;
  @IsOptional() @IsBoolean() atcdTransfusion?: boolean;
  @IsOptional() @IsString() incident?: string;
  @IsString() groupage: string;
  @IsOptional() @IsNumber() hb?: number;
  @IsString() produit: string;
  @IsOptional() @IsString() plaquettes?: string;
  @IsString() quantite: string;
  @IsOptional() @IsDateString() datePrevue?: string;
  @IsOptional() @IsString() notes?: string;
}

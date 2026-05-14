import { IsString, IsOptional, IsBoolean, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @IsString() type: string;
  @IsString() typeLabel: string;
  @IsString() description: string;
  @IsOptional() @IsString() duree?: string;
  @IsOptional() @IsString() frequence?: string;
  @IsOptional() @IsDateString() dateDebut?: string;
  @IsOptional() @IsString() heureDebut?: string;
  @IsOptional() @IsString() instructions?: string;
}

export class CreateNonMedicaleDto {
  @IsString() patientId: string;
  @IsString() prescripteurId: string;
  @IsOptional() @IsBoolean() notifierInfirmier?: boolean;
  @IsArray() @ValidateNested({ each: true }) @Type(() => ItemDto) items: ItemDto[];
}

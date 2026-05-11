import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateAnapathDto {
  @IsString() patientId: string;
  @IsOptional() @IsString() urgence?: string;
  @IsOptional() @IsString() alertes?: string;
  @IsString() typeExamen: string;
  @IsOptional() @IsObject() data?: any;
}

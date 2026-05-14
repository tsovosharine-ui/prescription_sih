import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { AnapathService } from './anapath.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateAnapathDto } from './dto/create-anapath.dto';

@Controller('prescriptions/anapath')
export class AnapathController {
  constructor(private service: AnapathService) {}

  @Post()
  create(@Body() dto: CreateAnapathDto) {
    return this.service.create(dto.prescripteurId, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }
}

import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { SurveillanceService } from './surveillance.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateSurveillanceDto } from './dto/create-surveillance.dto';

@Controller('prescriptions/surveillance')
export class SurveillanceController {
  constructor(private service: SurveillanceService) {}

  @Post()
  create(@Body() dto: CreateSurveillanceDto) {
    return this.service.create(dto.prescripteurId, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id/statut')
  updateStatut(@Param('id') id: string, @Body() dto: { statut: string }) {
    return this.service.updateStatut(id, dto.statut);
  }
}

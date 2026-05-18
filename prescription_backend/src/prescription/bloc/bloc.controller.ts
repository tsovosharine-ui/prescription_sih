import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { BlocService } from './bloc.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateBlocDto } from './dto/create-bloc.dto';

@Controller('prescriptions/bloc')
export class BlocController {
  constructor(private service: BlocService) {}

  @Post()
  create(@Body() dto: CreateBlocDto) {
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

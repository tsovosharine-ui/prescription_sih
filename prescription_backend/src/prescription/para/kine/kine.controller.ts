import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { KineService } from './kine.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateKineDto } from './dto/create-kine.dto';

@Controller('prescriptions/kine')
export class KineController {
  constructor(private service: KineService) {}

  @Post()
  create(@Body() dto: CreateKineDto) {
    return this.service.create(dto.prescripteurId, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }
}

import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { LaboService } from './labo.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateLaboDto } from './dto/create-labo.dto';

@Controller('prescriptions/labo')
export class LaboController {
  constructor(private service: LaboService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateLaboDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }
}

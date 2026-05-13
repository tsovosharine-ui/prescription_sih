import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { EndoscopieService } from './endoscopie.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateEndoscopieDto } from './dto/create-endoscopie.dto';

@Controller('prescriptions/endoscopie')
export class EndoscopieController {
  constructor(private service: EndoscopieService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateEndoscopieDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }
}

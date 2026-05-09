import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SurveillanceService } from './surveillance.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('prescriptions/surveillance')
export class SurveillanceController {
  constructor(private service: SurveillanceService) {}

  @Post()
  create(@Request() req: any, @Body() dto: any) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}

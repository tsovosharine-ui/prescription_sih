import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AnapathService } from './anapath.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('prescriptions/anapath')
export class AnapathController {
  constructor(private service: AnapathService) {}

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

  @Put(':id/statut')
  updateStatut(@Param('id') id: string, @Body() dto: { statut: string }) {
    return this.service.updateStatut(id, dto.statut);
  }
}

import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { NonMedicaleService } from './non-medicale.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('prescriptions/non-medicale')
export class NonMedicaleController {
  constructor(private service: NonMedicaleService) {}

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

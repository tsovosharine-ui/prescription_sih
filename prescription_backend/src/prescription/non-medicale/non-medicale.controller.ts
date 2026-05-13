import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { NonMedicaleService } from './non-medicale.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateNonMedicaleDto } from './dto/create-non-medicale.dto';

@Controller('prescriptions/non-medicale')
export class NonMedicaleController {
  constructor(private service: NonMedicaleService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateNonMedicaleDto) {
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

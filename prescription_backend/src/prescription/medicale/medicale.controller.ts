import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { MedicaleService } from './medicale.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateMedicaleDto } from './dto/create-medicale.dto';

@Controller('prescriptions/medicale')
export class MedicaleController {
  constructor(private service: MedicaleService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateMedicaleDto) {
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

  @Post(':id/ordonnance')
  createOrdonnance(@Param('id') id: string, @Body() dto: { medicaments: any[] }) {
    return this.service.createOrdonnance(id, dto.medicaments);
  }

  @Put(':id/statut')
  updateStatut(@Param('id') id: string, @Body() dto: { statut: string }) {
    return this.service.updateStatut(id, dto.statut);
  }
}

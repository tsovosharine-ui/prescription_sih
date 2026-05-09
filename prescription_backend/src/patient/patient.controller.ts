import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientController {
  constructor(private patientService: PatientService) {}

  @Post()
  create(@Body() dto: {
    nom: string;
    prenom: string;
    dateNaissance?: string;
    sexe?: string;
    telephone?: string;
    adresse?: string;
    allergies?: string[];
    categorie?: string;
  }) {
    return this.patientService.create(dto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.patientService.search(q || '');
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.patientService.findById(id);
  }

  @Get('permanent/:idPermanent')
  findByIdPermanent(@Param('idPermanent') idPermanent: string) {
    return this.patientService.findByIdPermanent(idPermanent);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.patientService.update(id, dto);
  }
}

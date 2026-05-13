import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { ImagerieService } from './imagerie.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateImagerieDto } from './dto/create-imagerie.dto';

@Controller('prescriptions/imagerie')
export class ImagerieController {
  constructor(private service: ImagerieService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateImagerieDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }
}

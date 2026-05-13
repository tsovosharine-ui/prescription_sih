import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { KineService } from './kine.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateKineDto } from './dto/create-kine.dto';

@Controller('prescriptions/kine')
export class KineController {
  constructor(private service: KineService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateKineDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }
}

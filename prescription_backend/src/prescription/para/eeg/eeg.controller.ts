import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { EegService } from './eeg.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateEEGDto } from './dto/create-eeg.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prescriptions/eeg')
export class EegController {
  constructor(private service: EegService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateEEGDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }
}

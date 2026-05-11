import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { DialyseService } from './dialyse.service';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { CreateDialyseDto } from './dto/create-dialyse.dto';

@UseGuards(JwtAuthGuard)
@Controller('prescriptions/dialyse')
export class DialyseController {
  constructor(private service: DialyseService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateDialyseDto) {
    return this.service.create(req.user.sub, dto);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.service.findByPatient(patientId);
  }
}

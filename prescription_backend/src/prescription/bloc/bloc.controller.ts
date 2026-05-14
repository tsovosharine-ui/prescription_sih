import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BlocService } from './bloc.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateBlocDto } from './dto/create-bloc.dto';

@Controller('prescriptions/bloc')
export class BlocController {
  constructor(private service: BlocService) {}

  @Post()
  create(@Body() dto: CreateBlocDto) {
    return this.service.create(dto.prescripteurId, dto);
  }
}

import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TransfusionService } from './transfusion.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateTransfusionDto } from './dto/create-transfusion.dto';

@UseGuards(JwtAuthGuard)
@Controller('prescriptions/transfusion')
export class TransfusionController {
  constructor(private service: TransfusionService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateTransfusionDto) {
    return this.service.create(req.user.sub, dto);
  }
}

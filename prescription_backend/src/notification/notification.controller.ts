import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('medicale/:id')
  createMedicale(@Param('id') id: string) {
    return this.notificationService.createForMedicale(id);
  }

  @Post('non-medicale/:id')
  createNonMedicale(@Param('id') id: string) {
    return this.notificationService.createForNonMedicale(id);
  }

  @Post('surveillance/:id')
  createSurveillance(@Param('id') id: string) {
    return this.notificationService.createForSurveillance(id);
  }
}

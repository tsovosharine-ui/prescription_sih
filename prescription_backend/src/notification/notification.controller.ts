import { ApiBearerAuth } from '@nestjs/swagger';
import { Controller, Get, Param, Put, UseGuards, Request } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private service: NotificationService) {}

  @Get('mes-notifications')
  getMes(@Request() req: any) {
    return this.service.getByDestinataire(req.user.sub);
  }

  @Get('service/:service')
  getByService(@Param('service') service: string) {
    return this.service.getByDestinataire(service);
  }

  @Get('non-lues/:destinataire')
  getUnread(@Param('destinataire') destinataire: string) {
    return this.service.getUnreadCount(destinataire);
  }

  @Put(':id/lire')
  markAsRead(@Param('id') id: string) {
    return this.service.markAsRead(id);
  }
}

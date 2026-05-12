import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/notifications',
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // userId → socketId
  private connectedUsers = new Map<string, string>();

  constructor(private notificationService: NotificationService) {}

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    const service = client.handshake.query.service as string;

    if (!userId) { client.disconnect(); return; }

    this.connectedUsers.set(userId, client.id);
    client.join(`user:${userId}`);
    if (service) client.join(`service:${service}`);

    console.log(`[WS] Connecté: ${userId} (${service || 'no-service'})`);

    // Livrer les notifications en attente
    const pending = await this.notificationService.getPending(userId, service);
    if (pending.length > 0) {
      pending.forEach(n => {
        client.emit('notification', n);
      });
      console.log(`[WS] ${pending.length} notification(s) en attente livrées à ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.connectedUsers.entries()) {
      if (socketId === client.id) {
        this.connectedUsers.delete(userId);
        console.log(`[WS] Déconnecté: ${userId}`);
        break;
      }
    }
  }

  // Envoyer à un utilisateur spécifique
  async sendToUser(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit('notification', notification);
  }

  // Envoyer à tout un service (ex: 'labo', 'infirmier', 'pharmacie')
  async sendToService(service: string, notification: any) {
    this.server.to(`service:${service}`).emit('notification', notification);
  }

  // ACK — le destinataire confirme la réception
  @SubscribeMessage('ack')
  async handleAck(
    @MessageBody() data: { notificationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    await this.notificationService.markAsRead(data.notificationId);
    client.emit('ack_confirmed', { notificationId: data.notificationId });
  }

  isUserConnected(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }
}

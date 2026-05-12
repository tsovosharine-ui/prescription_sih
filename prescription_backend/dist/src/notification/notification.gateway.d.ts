import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
export declare class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private notificationService;
    server: Server;
    private connectedUsers;
    constructor(notificationService: NotificationService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    sendToUser(userId: string, notification: any): Promise<void>;
    sendToService(service: string, notification: any): Promise<void>;
    handleAck(data: {
        notificationId: string;
    }, client: Socket): Promise<void>;
    isUserConnected(userId: string): boolean;
}

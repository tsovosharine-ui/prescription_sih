"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const notification_service_1 = require("./notification.service");
let NotificationGateway = class NotificationGateway {
    notificationService;
    server;
    connectedUsers = new Map();
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async handleConnection(client) {
        const userId = client.handshake.query.userId;
        const service = client.handshake.query.service;
        if (!userId) {
            client.disconnect();
            return;
        }
        this.connectedUsers.set(userId, client.id);
        client.join(`user:${userId}`);
        if (service)
            client.join(`service:${service}`);
        console.log(`[WS] Connecté: ${userId} (${service || 'no-service'})`);
        const pending = await this.notificationService.getPending(userId, service);
        if (pending.length > 0) {
            pending.forEach(n => {
                client.emit('notification', n);
            });
            console.log(`[WS] ${pending.length} notification(s) en attente livrées à ${userId}`);
        }
    }
    handleDisconnect(client) {
        for (const [userId, socketId] of this.connectedUsers.entries()) {
            if (socketId === client.id) {
                this.connectedUsers.delete(userId);
                console.log(`[WS] Déconnecté: ${userId}`);
                break;
            }
        }
    }
    async sendToUser(userId, notification) {
        this.server.to(`user:${userId}`).emit('notification', notification);
    }
    async sendToService(service, notification) {
        this.server.to(`service:${service}`).emit('notification', notification);
    }
    async handleAck(data, client) {
        await this.notificationService.markAsRead(data.notificationId);
        client.emit('ack_confirmed', { notificationId: data.notificationId });
    }
    isUserConnected(userId) {
        return this.connectedUsers.has(userId);
    }
};
exports.NotificationGateway = NotificationGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], NotificationGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('ack'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], NotificationGateway.prototype, "handleAck", null);
exports.NotificationGateway = NotificationGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: { origin: '*' },
        namespace: '/notifications',
    }),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationGateway);
//# sourceMappingURL=notification.gateway.js.map
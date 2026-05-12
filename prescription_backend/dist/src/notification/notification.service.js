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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationService = class NotificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.notification.create({ data: dto });
    }
    async getPending(userId, service) {
        return this.prisma.notification.findMany({
            where: {
                statut: 'EN_ATTENTE',
                OR: [
                    { destinataire: userId },
                    ...(service ? [{ destinataire: service }] : []),
                ],
            },
            orderBy: { createdAt: 'asc' },
        });
    }
    async markAsRead(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { statut: 'LU', luAt: new Date() },
        });
    }
    async markAsSent(id) {
        return this.prisma.notification.update({
            where: { id },
            data: { statut: 'ENVOYE', tentatives: { increment: 1 } },
        });
    }
    async getByDestinataire(destinataire, limit = 50) {
        return this.prisma.notification.findMany({
            where: { destinataire },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
    }
    async getUnreadCount(destinataire) {
        return this.prisma.notification.count({
            where: { destinataire, statut: { in: ['EN_ATTENTE', 'ENVOYE'] } },
        });
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map
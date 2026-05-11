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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationService = NotificationService_1 = class NotificationService {
    prisma;
    logger = new common_1.Logger(NotificationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createForMedicale(prescriptionMedicaleId) {
        try {
            const result = await this.prisma.notificationInfirmier.create({
                data: { prescriptionMedicaleId },
            });
            this.logger.log(`Notification créée pour prescription médicale : ${result.id}`);
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création notification médicale', error);
            throw error;
        }
    }
    async createForNonMedicale(prescriptionNonMedicaleId) {
        try {
            const result = await this.prisma.notificationInfirmier.create({
                data: { prescriptionNonMedicaleId },
            });
            this.logger.log(`Notification créée pour prescription non médicale : ${result.id}`);
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création notification non médicale', error);
            throw error;
        }
    }
    async createForSurveillance(prescriptionSurveillanceId) {
        try {
            const result = await this.prisma.notificationInfirmier.create({
                data: { prescriptionSurveillanceId },
            });
            this.logger.log(`Notification créée pour surveillance : ${result.id}`);
            return result;
        }
        catch (error) {
            this.logger.error('Erreur création notification surveillance', error);
            throw error;
        }
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map
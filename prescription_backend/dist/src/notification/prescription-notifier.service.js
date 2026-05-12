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
exports.PrescriptionNotifierService = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const notification_gateway_1 = require("./notification.gateway");
let PrescriptionNotifierService = class PrescriptionNotifierService {
    notificationService;
    gateway;
    constructor(notificationService, gateway) {
        this.notificationService = notificationService;
        this.gateway = gateway;
    }
    async notify(dto) {
        const titre = this.getTitre(dto.type, dto.urgence);
        const contenu = {
            referenceId: dto.referenceId,
            referenceType: dto.referenceType,
            patientId: dto.patientId,
            urgence: dto.urgence || 'n',
            ...dto.extra,
        };
        const notification = await this.notificationService.create({
            type: dto.type,
            destinataire: dto.type,
            expediteurId: dto.expediteurId,
            patientId: dto.patientId,
            referenceId: dto.referenceId,
            referenceType: dto.referenceType,
            titre,
            contenu,
        });
        await this.gateway.sendToService(dto.type, notification);
        await this.notificationService.markAsSent(notification.id);
        return notification;
    }
    getTitre(type, urgence) {
        const urgLabel = urgence === 'tu' ? '🔴 STAT — ' : urgence === 'u' ? '🟡 Urgent — ' : '';
        const labels = {
            'infirmier': 'Nouvelle prescription médicamenteuse',
            'labo': 'Nouvelle prescription Laboratoire',
            'imagerie': 'Nouvelle prescription Imagerie',
            'anapath': 'Nouvelle prescription Anatomopathologie',
            'eeg': 'Nouvelle prescription EEG',
            'kine': 'Nouvelle prescription Kinésithérapie',
            'dialyse': 'Nouvelle prescription Dialyse',
            'endoscopie': 'Nouvelle prescription Endoscopie',
            'depot-sang': 'Nouvelle prescription Transfusion sanguine',
            'bloc': 'Nouvelle demande Bloc opératoire (CPA)',
        };
        return `${urgLabel}${labels[type]}`;
    }
};
exports.PrescriptionNotifierService = PrescriptionNotifierService;
exports.PrescriptionNotifierService = PrescriptionNotifierService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService,
        notification_gateway_1.NotificationGateway])
], PrescriptionNotifierService);
//# sourceMappingURL=prescription-notifier.service.js.map
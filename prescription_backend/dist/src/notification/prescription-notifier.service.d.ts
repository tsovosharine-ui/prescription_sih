import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
export type DestinataireService = 'infirmier' | 'labo' | 'imagerie' | 'anapath' | 'eeg' | 'kine' | 'dialyse' | 'endoscopie' | 'depot-sang' | 'bloc';
export declare class PrescriptionNotifierService {
    private notificationService;
    private gateway;
    constructor(notificationService: NotificationService, gateway: NotificationGateway);
    notify(dto: {
        type: DestinataireService;
        expediteurId: string;
        patientId: string;
        referenceId: string;
        referenceType: string;
        urgence?: string;
        extra?: any;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        destinataire: string;
        expediteurId: string;
        patientId: string;
        referenceId: string;
        referenceType: string;
        titre: string;
        contenu: import("@prisma/client/runtime/library").JsonValue;
        statut: string;
        tentatives: number;
        luAt: Date | null;
    }>;
    private getTitre;
}

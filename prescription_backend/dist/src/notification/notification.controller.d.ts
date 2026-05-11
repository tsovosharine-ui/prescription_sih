import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    createMedicale(id: string): Promise<{
        id: string;
        createdAt: Date;
        prescriptionMedicaleId: string | null;
        prescriptionNonMedicaleId: string | null;
        prescriptionSurveillanceId: string | null;
        statut: string;
    }>;
    createNonMedicale(id: string): Promise<{
        id: string;
        createdAt: Date;
        prescriptionMedicaleId: string | null;
        prescriptionNonMedicaleId: string | null;
        prescriptionSurveillanceId: string | null;
        statut: string;
    }>;
    createSurveillance(id: string): Promise<{
        id: string;
        createdAt: Date;
        prescriptionMedicaleId: string | null;
        prescriptionNonMedicaleId: string | null;
        prescriptionSurveillanceId: string | null;
        statut: string;
    }>;
}

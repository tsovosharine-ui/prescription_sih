import { PrismaService } from '../../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../../notification/prescription-notifier.service';
export declare class AnapathService {
    private prisma;
    private notifier;
    constructor(prisma: PrismaService, notifier: PrescriptionNotifierService);
    create(prescripteurId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        statut: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
    }>;
    findByPatient(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        statut: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        statut: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
    }>;
    updateStatut(id: string, statut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        statut: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
    }>;
}

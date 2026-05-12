import { PrismaService } from '../../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../../notification/prescription-notifier.service';
export declare class ImagerieService {
    private prisma;
    private notifier;
    constructor(prisma: PrismaService, notifier: PrescriptionNotifierService);
    create(prescripteurId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        statutPatient: string | null;
        examens: import("@prisma/client/runtime/library").JsonValue;
    }>;
    findByPatient(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        statutPatient: string | null;
        examens: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        statutPatient: string | null;
        examens: import("@prisma/client/runtime/library").JsonValue;
    }>;
    updateStatut(id: string, statut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        statutPatient: string | null;
        examens: import("@prisma/client/runtime/library").JsonValue;
    }>;
}

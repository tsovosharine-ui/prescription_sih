import { PrismaService } from '../../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../../notification/prescription-notifier.service';
export declare class LaboService {
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
        analyses: string[];
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
        analyses: string[];
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
        analyses: string[];
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
        analyses: string[];
    }>;
}

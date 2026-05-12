import { PrismaService } from '../../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../../notification/prescription-notifier.service';
export declare class EegService {
    private prisma;
    private notifier;
    constructor(prisma: PrismaService, notifier: PrescriptionNotifierService);
    create(prescripteurId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        remarques: string | null;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeEEG: string;
    }>;
    findByPatient(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        remarques: string | null;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeEEG: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        remarques: string | null;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeEEG: string;
    }>;
    updateStatut(id: string, statut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        remarques: string | null;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeEEG: string;
    }>;
}

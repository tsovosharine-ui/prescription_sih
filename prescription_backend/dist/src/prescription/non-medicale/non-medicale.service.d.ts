import { PrismaService } from '../../prisma/prisma.service';
export declare class NonMedicaleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(prescripteurId: string, dto: any): Promise<{
        items: {
            id: string;
            createdAt: Date;
            type: string;
            description: string;
            frequence: string | null;
            duree: string | null;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            prescriptionId: string;
            typeLabel: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
    }>;
    findByPatient(patientId: string): Promise<({
        items: {
            id: string;
            createdAt: Date;
            type: string;
            description: string;
            frequence: string | null;
            duree: string | null;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            prescriptionId: string;
            typeLabel: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
    })[]>;
    findOne(id: string): Promise<{
        items: {
            id: string;
            createdAt: Date;
            type: string;
            description: string;
            frequence: string | null;
            duree: string | null;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            prescriptionId: string;
            typeLabel: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
    }>;
    updateStatut(id: string, statut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
    }>;
}

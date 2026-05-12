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
            typeLabel: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        notifierInfirmier: boolean;
        prescripteurId: string;
    }>;
    findByPatient(patientId: string): Promise<({
        prescripteur: {
            nom: string;
        };
        items: {
            description: string;
            frequence: string | null;
            duree: string | null;
            dateDebut: Date | null;
            typeLabel: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        notifierInfirmier: boolean;
        prescripteurId: string;
    })[]>;
    findOne(id: string): Promise<({
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
            typeLabel: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        notifierInfirmier: boolean;
        prescripteurId: string;
    }) | null>;
    updateStatut(id: string, statut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        notifierInfirmier: boolean;
        prescripteurId: string;
    }>;
}

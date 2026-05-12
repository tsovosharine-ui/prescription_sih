import { PrismaService } from '../../prisma/prisma.service';
export declare class SurveillanceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(prescripteurId: string, dto: any): Promise<{
        parametres: {
            id: string;
            createdAt: Date;
            frequence: string;
            duree: string | null;
            prescriptionId: string;
            parametre: string;
            seuil: string | null;
            details: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        notifierInfirmier: boolean;
        prescripteurId: string;
        notes: string | null;
    }>;
    findByPatient(patientId: string): Promise<({
        prescripteur: {
            nom: string;
        };
        parametres: {
            frequence: string;
            duree: string | null;
            parametre: string;
            seuil: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        notifierInfirmier: boolean;
        prescripteurId: string;
        notes: string | null;
    })[]>;
    findOne(id: string): Promise<({
        parametres: {
            id: string;
            createdAt: Date;
            frequence: string;
            duree: string | null;
            prescriptionId: string;
            parametre: string;
            seuil: string | null;
            details: import("@prisma/client/runtime/library").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        notifierInfirmier: boolean;
        prescripteurId: string;
        notes: string | null;
    }) | null>;
    updateStatut(id: string, statut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        notifierInfirmier: boolean;
        prescripteurId: string;
        notes: string | null;
    }>;
}

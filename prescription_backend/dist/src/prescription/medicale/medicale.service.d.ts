import { PrismaService } from '../../prisma/prisma.service';
export declare class MedicaleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(prescripteurId: string, dto: any): Promise<{
        ordonnance: {
            id: string;
            createdAt: Date;
            medicaments: import("@prisma/client/runtime/library").JsonValue;
            prescriptionId: string;
        } | null;
        medicaments: {
            id: string;
            nom: string;
            createdAt: Date;
            remarques: string | null;
            dose: string;
            quantite: number;
            voie: string | null;
            frequence: string;
            duree: string;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            prescriptionId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
    }>;
    findByPatient(patientId: string): Promise<({
        medicaments: {
            id: string;
            nom: string;
            createdAt: Date;
            remarques: string | null;
            dose: string;
            quantite: number;
            voie: string | null;
            frequence: string;
            duree: string;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            prescriptionId: string;
        }[];
        prescripteur: {
            id: string;
            email: string;
            nom: string;
            prenoms: string;
            password: string;
            poste: string;
            matricule: string | null;
            numeroOrdre: string | null;
            ordre: string | null;
            telephone: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
    })[]>;
    findOne(id: string): Promise<({
        medicaments: {
            id: string;
            nom: string;
            createdAt: Date;
            remarques: string | null;
            dose: string;
            quantite: number;
            voie: string | null;
            frequence: string;
            duree: string;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            prescriptionId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
    }) | null>;
    createOrdonnance(prescriptionId: string, medicaments: any[]): Promise<{
        id: string;
        createdAt: Date;
        medicaments: import("@prisma/client/runtime/library").JsonValue;
        prescriptionId: string;
    }>;
    updateStatut(id: string, statut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
    }>;
}

import { PrismaService } from '../../prisma/prisma.service';
import { PrescriptionNotifierService } from '../../notification/prescription-notifier.service';
export declare class MedicaleService {
    private prisma;
    private notifier;
    constructor(prisma: PrismaService, notifier: PrescriptionNotifierService);
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
        patientId: string;
        statut: string;
        prescripteurId: string;
        remarques: string | null;
        notifierInfirmier: boolean;
    }>;
    findByPatient(patientId: string): Promise<({
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
        patientId: string;
        statut: string;
        prescripteurId: string;
        remarques: string | null;
        notifierInfirmier: boolean;
    })[]>;
    findOne(id: string): Promise<{
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
        patientId: string;
        statut: string;
        prescripteurId: string;
        remarques: string | null;
        notifierInfirmier: boolean;
    }>;
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
        patientId: string;
        statut: string;
        prescripteurId: string;
        remarques: string | null;
        notifierInfirmier: boolean;
    }>;
}

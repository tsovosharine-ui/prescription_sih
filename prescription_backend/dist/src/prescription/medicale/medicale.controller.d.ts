import { MedicaleService } from './medicale.service';
import { CreateMedicaleDto } from './dto/create-medicale.dto';
export declare class MedicaleController {
    private service;
    constructor(service: MedicaleService);
    create(req: any, dto: CreateMedicaleDto): Promise<{
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
        remarques: string | null;
        notifierInfirmier: boolean;
        prescripteurId: string;
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
        remarques: string | null;
        notifierInfirmier: boolean;
        prescripteurId: string;
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
        remarques: string | null;
        notifierInfirmier: boolean;
        prescripteurId: string;
    }>;
    createOrdonnance(id: string, dto: {
        medicaments: any[];
    }): Promise<{
        id: string;
        createdAt: Date;
        medicaments: import("@prisma/client/runtime/library").JsonValue;
        prescriptionId: string;
    }>;
    updateStatut(id: string, dto: {
        statut: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        prescripteurId: string;
    }>;
}

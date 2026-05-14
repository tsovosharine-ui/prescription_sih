import { MedicaleService } from './medicale.service';
import { CreateMedicaleDto } from './dto/create-medicale.dto';
export declare class MedicaleController {
    private service;
    constructor(service: MedicaleService);
    create(dto: CreateMedicaleDto): Promise<{
        medicaments: {
            id: string;
            remarques: string | null;
            createdAt: Date;
            nom: string;
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
        ordonnance: {
            id: string;
            createdAt: Date;
            medicaments: import("@prisma/client/runtime/library").JsonValue;
            prescriptionId: string;
        } | null;
    } & {
        id: string;
        patientId: string;
        prescripteurId: string;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByPatient(patientId: string): Promise<({
        medicaments: {
            id: string;
            remarques: string | null;
            createdAt: Date;
            nom: string;
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
        ordonnance: {
            id: string;
            createdAt: Date;
            medicaments: import("@prisma/client/runtime/library").JsonValue;
            prescriptionId: string;
        } | null;
    } & {
        id: string;
        patientId: string;
        prescripteurId: string;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        medicaments: {
            id: string;
            remarques: string | null;
            createdAt: Date;
            nom: string;
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
        ordonnance: {
            id: string;
            createdAt: Date;
            medicaments: import("@prisma/client/runtime/library").JsonValue;
            prescriptionId: string;
        } | null;
    } & {
        id: string;
        patientId: string;
        prescripteurId: string;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        patientId: string;
        prescripteurId: string;
        statut: string;
        remarques: string | null;
        notifierInfirmier: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

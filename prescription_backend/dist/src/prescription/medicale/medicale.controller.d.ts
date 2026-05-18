import { MedicaleService } from './medicale.service';
import { CreateMedicaleDto } from './dto/create-medicale.dto';
export declare class MedicaleController {
    private service;
    constructor(service: MedicaleService);
    create(dto: CreateMedicaleDto): Promise<{
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
        prescripteurId: string;
        remarques: string | null;
        notifierInfirmier: boolean;
    }>;
}

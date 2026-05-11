import { NonMedicaleService } from './non-medicale.service';
import { CreateNonMedicaleDto } from './dto/create-non-medicale.dto';
export declare class NonMedicaleController {
    private service;
    constructor(service: NonMedicaleService);
    create(req: any, dto: CreateNonMedicaleDto): Promise<{
        items: {
            id: string;
            createdAt: Date;
            frequence: string | null;
            duree: string | null;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            prescriptionId: string;
            typeLabel: string;
            type: string;
            description: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
    }>;
    findByPatient(patientId: string): Promise<({
        prescripteur: {
            nom: string;
        };
        items: {
            frequence: string | null;
            duree: string | null;
            dateDebut: Date | null;
            typeLabel: string;
            description: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
    })[]>;
    findOne(id: string): Promise<({
        items: {
            id: string;
            createdAt: Date;
            frequence: string | null;
            duree: string | null;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            prescriptionId: string;
            typeLabel: string;
            type: string;
            description: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
    }) | null>;
    updateStatut(id: string, dto: {
        statut: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
    }>;
}

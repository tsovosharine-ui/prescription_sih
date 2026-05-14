import { NonMedicaleService } from './non-medicale.service';
import { CreateNonMedicaleDto } from './dto/create-non-medicale.dto';
export declare class NonMedicaleController {
    private service;
    constructor(service: NonMedicaleService);
    create(dto: CreateNonMedicaleDto): Promise<{
        items: {
            type: string;
            typeLabel: string | null;
            description: string;
            duree: string | null;
            frequence: string | null;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            id: string;
            createdAt: Date;
            prescriptionId: string;
        }[];
    } & {
        patientId: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByPatient(patientId: string): Promise<({
        items: {
            type: string;
            typeLabel: string | null;
            description: string;
            duree: string | null;
            frequence: string | null;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            id: string;
            createdAt: Date;
            prescriptionId: string;
        }[];
    } & {
        patientId: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        items: {
            type: string;
            typeLabel: string | null;
            description: string;
            duree: string | null;
            frequence: string | null;
            dateDebut: Date | null;
            heureDebut: string | null;
            instructions: string | null;
            id: string;
            createdAt: Date;
            prescriptionId: string;
        }[];
    } & {
        patientId: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStatut(id: string, dto: {
        statut: string;
    }): Promise<{
        patientId: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

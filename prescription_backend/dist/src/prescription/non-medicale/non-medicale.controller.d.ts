import { NonMedicaleService } from './non-medicale.service';
import { CreateNonMedicaleDto } from './dto/create-non-medicale.dto';
export declare class NonMedicaleController {
    private service;
    constructor(service: NonMedicaleService);
    create(req: any, dto: CreateNonMedicaleDto): Promise<{
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
    updateStatut(id: string, dto: {
        statut: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
    }>;
}

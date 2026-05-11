import { SurveillanceService } from './surveillance.service';
import { CreateSurveillanceDto } from './dto/create-surveillance.dto';
export declare class SurveillanceController {
    private service;
    constructor(service: SurveillanceService);
    create(req: any, dto: CreateSurveillanceDto): Promise<{
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
        statut: string;
        notifierInfirmier: boolean;
        patientId: string;
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
        statut: string;
        notifierInfirmier: boolean;
        patientId: string;
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
        statut: string;
        notifierInfirmier: boolean;
        patientId: string;
        prescripteurId: string;
        notes: string | null;
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
        notes: string | null;
    }>;
}

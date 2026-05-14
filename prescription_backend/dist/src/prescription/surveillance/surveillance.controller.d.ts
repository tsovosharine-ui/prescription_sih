import { SurveillanceService } from './surveillance.service';
import { CreateSurveillanceDto } from './dto/create-surveillance.dto';
export declare class SurveillanceController {
    private service;
    constructor(service: SurveillanceService);
    create(dto: CreateSurveillanceDto): Promise<{
        parametres: {
            duree: string | null;
            frequence: string;
            parametre: string;
            seuil: string | null;
            id: string;
            createdAt: Date;
            details: import("@prisma/client/runtime/library").JsonValue | null;
            prescriptionId: string;
        }[];
    } & {
        patientId: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
        notes: string | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByPatient(patientId: string): Promise<({
        parametres: {
            duree: string | null;
            frequence: string;
            parametre: string;
            seuil: string | null;
            id: string;
            createdAt: Date;
            details: import("@prisma/client/runtime/library").JsonValue | null;
            prescriptionId: string;
        }[];
    } & {
        patientId: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
        notes: string | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        parametres: {
            duree: string | null;
            frequence: string;
            parametre: string;
            seuil: string | null;
            id: string;
            createdAt: Date;
            details: import("@prisma/client/runtime/library").JsonValue | null;
            prescriptionId: string;
        }[];
    } & {
        patientId: string;
        prescripteurId: string;
        notifierInfirmier: boolean;
        notes: string | null;
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
        notes: string | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

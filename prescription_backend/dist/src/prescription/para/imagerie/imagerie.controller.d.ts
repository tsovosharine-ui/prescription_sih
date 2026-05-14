import { ImagerieService } from './imagerie.service';
import { CreateImagerieDto } from './dto/create-imagerie.dto';
export declare class ImagerieController {
    private service;
    constructor(service: ImagerieService);
    create(dto: CreateImagerieDto): Promise<{
        patientId: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        examens: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
        statutPatient: string | null;
    }>;
    findByPatient(patientId: string): Promise<{
        patientId: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        examens: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
        statutPatient: string | null;
    }[]>;
}

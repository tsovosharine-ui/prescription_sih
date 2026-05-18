import { ImagerieService } from './imagerie.service';
import { CreateImagerieDto } from './dto/create-imagerie.dto';
export declare class ImagerieController {
    private service;
    constructor(service: ImagerieService);
    create(dto: CreateImagerieDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        statutPatient: string | null;
        examens: import("@prisma/client/runtime/library").JsonValue;
    }>;
    findByPatient(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        statutPatient: string | null;
        examens: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
}

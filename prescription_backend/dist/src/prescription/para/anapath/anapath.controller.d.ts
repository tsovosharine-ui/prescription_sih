import { AnapathService } from './anapath.service';
import { CreateAnapathDto } from './dto/create-anapath.dto';
export declare class AnapathController {
    private service;
    constructor(service: AnapathService);
    create(dto: CreateAnapathDto): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByPatient(patientId: string): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}

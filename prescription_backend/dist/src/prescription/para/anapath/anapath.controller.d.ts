import { AnapathService } from './anapath.service';
import { CreateAnapathDto } from './dto/create-anapath.dto';
export declare class AnapathController {
    private service;
    constructor(service: AnapathService);
    create(dto: CreateAnapathDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        statut: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
    }>;
    findByPatient(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        statut: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
    }[]>;
}

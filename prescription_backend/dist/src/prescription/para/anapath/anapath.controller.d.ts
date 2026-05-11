import { AnapathService } from './anapath.service';
import { CreateAnapathDto } from './dto/create-anapath.dto';
export declare class AnapathController {
    private service;
    constructor(service: AnapathService);
    create(req: any, dto: CreateAnapathDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
    }>;
    findByPatient(patientId: string): Promise<({
        prescripteur: {
            nom: string;
            prenoms: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        data: import("@prisma/client/runtime/library").JsonValue;
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        typeExamen: string;
    })[]>;
}

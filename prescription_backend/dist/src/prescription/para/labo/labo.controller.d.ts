import { LaboService } from './labo.service';
import { CreateLaboDto } from './dto/create-labo.dto';
export declare class LaboController {
    private service;
    constructor(service: LaboService);
    create(dto: CreateLaboDto): Promise<{
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
        analyses: string[];
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
        analyses: string[];
    }[]>;
}

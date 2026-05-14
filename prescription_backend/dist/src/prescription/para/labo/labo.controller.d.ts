import { LaboService } from './labo.service';
import { CreateLaboDto } from './dto/create-labo.dto';
export declare class LaboController {
    private service;
    constructor(service: LaboService);
    create(dto: CreateLaboDto): Promise<{
        patientId: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        analyses: string[];
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByPatient(patientId: string): Promise<{
        patientId: string;
        prescripteurId: string;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        analyses: string[];
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}

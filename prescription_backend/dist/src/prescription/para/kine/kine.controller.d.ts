import { KineService } from './kine.service';
import { CreateKineDto } from './dto/create-kine.dto';
export declare class KineController {
    private service;
    constructor(service: KineService);
    create(dto: CreateKineDto): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        remarques: string | null;
        typeKine: string;
        diagnostic: string | null;
        contreIndications: string[];
        objectifs: string | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
        autreKine: string | null;
        autreContreIndic: string | null;
    }>;
    findByPatient(patientId: string): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        remarques: string | null;
        typeKine: string;
        diagnostic: string | null;
        contreIndications: string[];
        objectifs: string | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
        autreKine: string | null;
        autreContreIndic: string | null;
    }[]>;
}

import { KineService } from './kine.service';
import { CreateKineDto } from './dto/create-kine.dto';
export declare class KineController {
    private service;
    constructor(service: KineService);
    create(req: any, dto: CreateKineDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        remarques: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeKine: string;
        autreKine: string | null;
        diagnostic: string | null;
        contreIndications: string[];
        autreContreIndic: string | null;
        objectifs: string | null;
    }>;
    findByPatient(patientId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        remarques: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeKine: string;
        autreKine: string | null;
        diagnostic: string | null;
        contreIndications: string[];
        autreContreIndic: string | null;
        objectifs: string | null;
    }[]>;
}

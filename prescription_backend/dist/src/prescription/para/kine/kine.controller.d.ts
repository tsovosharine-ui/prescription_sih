import { KineService } from './kine.service';
import { CreateKineDto } from './dto/create-kine.dto';
export declare class KineController {
    private service;
    constructor(service: KineService);
    create(req: any, dto: CreateKineDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        remarques: string | null;
        patientId: string;
        prescripteurId: string;
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
        remarques: string | null;
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeKine: string;
        autreKine: string | null;
        diagnostic: string | null;
        contreIndications: string[];
        autreContreIndic: string | null;
        objectifs: string | null;
    })[]>;
}

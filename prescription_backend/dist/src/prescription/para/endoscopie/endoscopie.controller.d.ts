import { EndoscopieService } from './endoscopie.service';
import { CreateEndoscopieDto } from './dto/create-endoscopie.dto';
export declare class EndoscopieController {
    private service;
    constructor(service: EndoscopieService);
    create(req: any, dto: CreateEndoscopieDto): Promise<{
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
        typeExamen: string;
        autreExamen: string | null;
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
        typeExamen: string;
        autreExamen: string | null;
    })[]>;
}

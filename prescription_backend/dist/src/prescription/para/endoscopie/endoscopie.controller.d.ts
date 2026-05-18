import { EndoscopieService } from './endoscopie.service';
import { CreateEndoscopieDto } from './dto/create-endoscopie.dto';
export declare class EndoscopieController {
    private service;
    constructor(service: EndoscopieService);
    create(dto: CreateEndoscopieDto): Promise<{
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
        typeExamen: string;
        autreExamen: string | null;
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
        typeExamen: string;
        autreExamen: string | null;
    }[]>;
}

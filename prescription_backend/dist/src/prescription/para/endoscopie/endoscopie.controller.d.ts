import { EndoscopieService } from './endoscopie.service';
import { CreateEndoscopieDto } from './dto/create-endoscopie.dto';
export declare class EndoscopieController {
    private service;
    constructor(service: EndoscopieService);
    create(dto: CreateEndoscopieDto): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeExamen: string;
        remarques: string | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
        autreExamen: string | null;
    }>;
    findByPatient(patientId: string): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeExamen: string;
        remarques: string | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
        autreExamen: string | null;
    }[]>;
}

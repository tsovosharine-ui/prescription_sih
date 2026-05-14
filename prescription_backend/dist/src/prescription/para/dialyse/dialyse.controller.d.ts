import { DialyseService } from './dialyse.service';
import { CreateDialyseDto } from './dto/create-dialyse.dto';
export declare class DialyseController {
    private service;
    constructor(service: DialyseService);
    create(dto: CreateDialyseDto): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        remarques: string | null;
        typeDialyse: string;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByPatient(patientId: string): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        remarques: string | null;
        typeDialyse: string;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}

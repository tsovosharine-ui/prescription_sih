import { DialyseService } from './dialyse.service';
import { CreateDialyseDto } from './dto/create-dialyse.dto';
export declare class DialyseController {
    private service;
    constructor(service: DialyseService);
    create(dto: CreateDialyseDto): Promise<{
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
        typeDialyse: string;
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
        typeDialyse: string;
    }[]>;
}

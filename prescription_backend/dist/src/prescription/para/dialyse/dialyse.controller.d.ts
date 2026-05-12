import { DialyseService } from './dialyse.service';
import { CreateDialyseDto } from './dto/create-dialyse.dto';
export declare class DialyseController {
    private service;
    constructor(service: DialyseService);
    create(req: any, dto: CreateDialyseDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        remarques: string | null;
        prescripteurId: string;
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
        remarques: string | null;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeDialyse: string;
    }[]>;
}

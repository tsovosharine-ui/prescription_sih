import { DialyseService } from './dialyse.service';
import { CreateDialyseDto } from './dto/create-dialyse.dto';
export declare class DialyseController {
    private service;
    constructor(service: DialyseService);
    create(req: any, dto: CreateDialyseDto): Promise<{
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
        typeDialyse: string;
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
        typeDialyse: string;
    })[]>;
}

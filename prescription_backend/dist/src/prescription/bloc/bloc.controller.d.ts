import { BlocService } from './bloc.service';
import { CreateBlocDto } from './dto/create-bloc.dto';
export declare class BlocController {
    private service;
    constructor(service: BlocService);
    create(req: any, dto: CreateBlocDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        libelle: string;
        cote: string | null;
        dateIntervention: Date | null;
        risqueHemorragique: string | null;
        typeChirurgie: string | null;
        consignes: string | null;
        chirurgien: string | null;
    }>;
}

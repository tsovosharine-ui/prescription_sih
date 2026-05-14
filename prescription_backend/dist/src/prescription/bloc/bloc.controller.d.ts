import { BlocService } from './bloc.service';
import { CreateBlocDto } from './dto/create-bloc.dto';
export declare class BlocController {
    private service;
    constructor(service: BlocService);
    create(dto: CreateBlocDto): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        libelle: string;
        risqueHemorragique: string | null;
        typeChirurgie: string | null;
        chirurgien: string | null;
        consignes: string | null;
        dateIntervention: Date | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
        cote: string | null;
    }>;
}

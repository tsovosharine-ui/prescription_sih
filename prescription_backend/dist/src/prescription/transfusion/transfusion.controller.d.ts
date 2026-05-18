import { TransfusionService } from './transfusion.service';
import { CreateTransfusionDto } from './dto/create-transfusion.dto';
export declare class TransfusionController {
    private service;
    constructor(service: TransfusionService);
    create(dto: CreateTransfusionDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        patientId: string;
        statut: string;
        prescripteurId: string;
        quantite: string | null;
        notes: string | null;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        atcdTransfusion: boolean;
        incident: string | null;
        groupage: string;
        hb: number | null;
        produit: string;
        plaquettes: number | null;
        datePrevue: Date | null;
    }>;
}

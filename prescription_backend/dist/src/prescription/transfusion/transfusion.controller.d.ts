import { TransfusionService } from './transfusion.service';
import { CreateTransfusionDto } from './dto/create-transfusion.dto';
export declare class TransfusionController {
    private service;
    constructor(service: TransfusionService);
    create(dto: CreateTransfusionDto): Promise<{
        patientId: string;
        prescripteurId: string;
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
        quantite: string | null;
        datePrevue: Date | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

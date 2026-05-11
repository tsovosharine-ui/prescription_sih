import { EegService } from './eeg.service';
import { CreateEEGDto } from './dto/create-eeg.dto';
export declare class EegController {
    private service;
    constructor(service: EegService);
    create(req: any, dto: CreateEEGDto): Promise<{
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
        typeEEG: string;
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
        typeEEG: string;
    })[]>;
}

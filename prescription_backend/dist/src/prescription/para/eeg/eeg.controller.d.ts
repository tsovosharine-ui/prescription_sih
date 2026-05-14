import { EegService } from './eeg.service';
import { CreateEEGDto } from './dto/create-eeg.dto';
export declare class EegController {
    private service;
    constructor(service: EegService);
    create(dto: CreateEEGDto): Promise<{
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeEEG: string;
        remarques: string | null;
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
        typeEEG: string;
        remarques: string | null;
        id: string;
        statut: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}

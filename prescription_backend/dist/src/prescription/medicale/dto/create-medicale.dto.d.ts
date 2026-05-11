declare class MedicamentDto {
    nom: string;
    dose: string;
    quantite: number;
    voie?: string;
    frequence: string;
    duree: string;
    dateDebut?: string;
    heureDebut?: string;
    instructions?: string;
    remarques?: string;
}
export declare class CreateMedicaleDto {
    patientId: string;
    remarques?: string;
    notifierInfirmier?: boolean;
    medicaments: MedicamentDto[];
}
export {};

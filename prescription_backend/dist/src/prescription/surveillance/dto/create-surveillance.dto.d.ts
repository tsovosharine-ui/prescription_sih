declare class ParametreDto {
    parametre: string;
    frequence: string;
    duree?: string;
    seuil?: string;
}
export declare class CreateSurveillanceDto {
    patientId: string;
    prescripteurId: string;
    notes?: string;
    notifierInfirmier?: boolean;
    parametres: ParametreDto[];
}
export {};

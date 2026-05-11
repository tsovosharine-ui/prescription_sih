declare class ItemDto {
    type: string;
    typeLabel: string;
    description: string;
    duree?: string;
    frequence?: string;
    dateDebut?: string;
    heureDebut?: string;
    instructions?: string;
}
export declare class CreateNonMedicaleDto {
    patientId: string;
    notifierInfirmier?: boolean;
    items: ItemDto[];
}
export {};

import { PatientService } from './patient.service';
export declare class PatientController {
    private patientService;
    constructor(patientService: PatientService);
    create(dto: {
        nom: string;
        prenom: string;
        dateNaissance?: string;
        sexe?: string;
        telephone?: string;
        adresse?: string;
        allergies?: string[];
        categorie?: string;
    }): Promise<{
        id: string;
        nom: string;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        idPermanent: string;
        prenom: string;
        dateNaissance: Date | null;
        sexe: string | null;
        adresse: string | null;
        allergies: string[];
        categorie: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        nom: string;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        idPermanent: string;
        prenom: string;
        dateNaissance: Date | null;
        sexe: string | null;
        adresse: string | null;
        allergies: string[];
        categorie: string | null;
    }[]>;
    search(q: string): Promise<{
        id: string;
        nom: string;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        idPermanent: string;
        prenom: string;
        dateNaissance: Date | null;
        sexe: string | null;
        adresse: string | null;
        allergies: string[];
        categorie: string | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        nom: string;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        idPermanent: string;
        prenom: string;
        dateNaissance: Date | null;
        sexe: string | null;
        adresse: string | null;
        allergies: string[];
        categorie: string | null;
    }>;
    findByIdPermanent(idPermanent: string): Promise<{
        id: string;
        nom: string;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        idPermanent: string;
        prenom: string;
        dateNaissance: Date | null;
        sexe: string | null;
        adresse: string | null;
        allergies: string[];
        categorie: string | null;
    }>;
    update(id: string, dto: any): Promise<{
        id: string;
        nom: string;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
        idPermanent: string;
        prenom: string;
        dateNaissance: Date | null;
        sexe: string | null;
        adresse: string | null;
        allergies: string[];
        categorie: string | null;
    }>;
}

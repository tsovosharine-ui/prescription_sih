import { PrismaService } from '../prisma/prisma.service';
export declare class PatientService {
    private prisma;
    constructor(prisma: PrismaService);
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
    search(query: string): Promise<{
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
    update(id: string, dto: Partial<{
        nom: string;
        prenom: string;
        dateNaissance: string;
        sexe: string;
        telephone: string;
        adresse: string;
        allergies: string[];
        categorie: string;
    }>): Promise<{
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
    private generateId;
}

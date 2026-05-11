import { PrismaService } from '../../prisma/prisma.service';
export declare class BlocService {
    private prisma;
    constructor(prisma: PrismaService);
    create(prescripteurId: string, dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        libelle: string;
        cote: string | null;
        dateIntervention: Date | null;
        risqueHemorragique: string | null;
        typeChirurgie: string | null;
        consignes: string | null;
        chirurgien: string | null;
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
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        libelle: string;
        cote: string | null;
        dateIntervention: Date | null;
        risqueHemorragique: string | null;
        typeChirurgie: string | null;
        consignes: string | null;
        chirurgien: string | null;
    })[]>;
    findOne(id: string): Promise<{
        patient: {
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
        };
        prescripteur: {
            nom: string;
            prenoms: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        libelle: string;
        cote: string | null;
        dateIntervention: Date | null;
        risqueHemorragique: string | null;
        typeChirurgie: string | null;
        consignes: string | null;
        chirurgien: string | null;
    }>;
    updateStatut(id: string, statut: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statut: string;
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        libelle: string;
        cote: string | null;
        dateIntervention: Date | null;
        risqueHemorragique: string | null;
        typeChirurgie: string | null;
        consignes: string | null;
        chirurgien: string | null;
    }>;
}

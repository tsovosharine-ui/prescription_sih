import { PrismaService } from '../../../prisma/prisma.service';
export declare class KineService {
    private prisma;
    constructor(prisma: PrismaService);
    create(prescripteurId: string, dto: any): Promise<{
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
        typeKine: string;
        autreKine: string | null;
        diagnostic: string | null;
        contreIndications: string[];
        autreContreIndic: string | null;
        objectifs: string | null;
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
        typeKine: string;
        autreKine: string | null;
        diagnostic: string | null;
        contreIndications: string[];
        autreContreIndic: string | null;
        objectifs: string | null;
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
        remarques: string | null;
        patientId: string;
        prescripteurId: string;
        urgence: string;
        alertes: string | null;
        renseignements: string;
        typeKine: string;
        autreKine: string | null;
        diagnostic: string | null;
        contreIndications: string[];
        autreContreIndic: string | null;
        objectifs: string | null;
    }>;
    updateStatut(id: string, statut: string): Promise<{
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
        typeKine: string;
        autreKine: string | null;
        diagnostic: string | null;
        contreIndications: string[];
        autreContreIndic: string | null;
        objectifs: string | null;
    }>;
}

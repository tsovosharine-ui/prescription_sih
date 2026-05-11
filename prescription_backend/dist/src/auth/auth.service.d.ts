import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    register(dto: {
        nom: string;
        prenoms: string;
        email: string;
        password: string;
        poste: string;
        matricule?: string;
        numeroOrdre?: string;
        ordre?: string;
        telephone?: string;
    }): Promise<{
        id: string;
        email: string;
        nom: string;
        prenoms: string;
        poste: string;
        matricule: string | null;
        numeroOrdre: string | null;
        ordre: string | null;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            nom: string;
            prenoms: string;
            poste: string;
            matricule: string | null;
            numeroOrdre: string | null;
            ordre: string | null;
            telephone: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        nom: string;
        prenoms: string;
        poste: string;
        matricule: string | null;
        numeroOrdre: string | null;
        ordre: string | null;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

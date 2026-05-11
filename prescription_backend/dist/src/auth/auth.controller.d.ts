import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    login(dto: {
        email: string;
        password: string;
    }): Promise<{
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
    getProfile(req: any): Promise<{
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

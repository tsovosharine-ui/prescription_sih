import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: string;
        nom: string;
        prenoms: string;
        email: string;
        poste: string;
        matricule: string | null;
        numeroOrdre: string | null;
        ordre: string | null;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            nom: string;
            prenoms: string;
            email: string;
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
        nom: string;
        prenoms: string;
        email: string;
        poste: string;
        matricule: string | null;
        numeroOrdre: string | null;
        ordre: string | null;
        telephone: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}

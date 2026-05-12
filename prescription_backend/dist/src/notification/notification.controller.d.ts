import { NotificationService } from './notification.service';
export declare class NotificationController {
    private service;
    constructor(service: NotificationService);
    getMes(req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        destinataire: string;
        expediteurId: string;
        patientId: string;
        referenceId: string;
        referenceType: string;
        titre: string;
        contenu: import("@prisma/client/runtime/library").JsonValue;
        statut: string;
        tentatives: number;
        luAt: Date | null;
    }[]>;
    getByService(service: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        destinataire: string;
        expediteurId: string;
        patientId: string;
        referenceId: string;
        referenceType: string;
        titre: string;
        contenu: import("@prisma/client/runtime/library").JsonValue;
        statut: string;
        tentatives: number;
        luAt: Date | null;
    }[]>;
    getUnread(destinataire: string): Promise<number>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        type: string;
        destinataire: string;
        expediteurId: string;
        patientId: string;
        referenceId: string;
        referenceType: string;
        titre: string;
        contenu: import("@prisma/client/runtime/library").JsonValue;
        statut: string;
        tentatives: number;
        luAt: Date | null;
    }>;
}

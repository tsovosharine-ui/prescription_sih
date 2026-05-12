import { Injectable } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';

export type DestinataireService =
  | 'infirmier'
  | 'labo'
  | 'imagerie'
  | 'anapath'
  | 'eeg'
  | 'kine'
  | 'dialyse'
  | 'endoscopie'
  | 'depot-sang'
  | 'bloc';

@Injectable()
export class PrescriptionNotifierService {
  constructor(
    private notificationService: NotificationService,
    private gateway: NotificationGateway,
  ) {}

  async notify(dto: {
    type: DestinataireService;
    expediteurId: string;
    patientId: string;
    referenceId: string;
    referenceType: string;
    urgence?: string;
    extra?: any;
  }) {
    const titre = this.getTitre(dto.type, dto.urgence);
    const contenu = {
      referenceId: dto.referenceId,
      referenceType: dto.referenceType,
      patientId: dto.patientId,
      urgence: dto.urgence || 'n',
      ...dto.extra,
    };

    // 1. Persister en BDD
    const notification = await this.notificationService.create({
      type: dto.type,
      destinataire: dto.type,
      expediteurId: dto.expediteurId,
      patientId: dto.patientId,
      referenceId: dto.referenceId,
      referenceType: dto.referenceType,
      titre,
      contenu,
    });

    // 2. Envoyer en temps réel au service
    await this.gateway.sendToService(dto.type, notification);

    // 3. Marquer comme envoyé
    await this.notificationService.markAsSent(notification.id);

    return notification;
  }

  private getTitre(type: DestinataireService, urgence?: string): string {
    const urgLabel = urgence === 'tu' ? '🔴 STAT — ' : urgence === 'u' ? '🟡 Urgent — ' : '';
    const labels: Record<DestinataireService, string> = {
      'infirmier':    'Nouvelle prescription médicamenteuse',
      'labo':         'Nouvelle prescription Laboratoire',
      'imagerie':     'Nouvelle prescription Imagerie',
      'anapath':      'Nouvelle prescription Anatomopathologie',
      'eeg':          'Nouvelle prescription EEG',
      'kine':         'Nouvelle prescription Kinésithérapie',
      'dialyse':      'Nouvelle prescription Dialyse',
      'endoscopie':   'Nouvelle prescription Endoscopie',
      'depot-sang':   'Nouvelle prescription Transfusion sanguine',
      'bloc':         'Nouvelle demande Bloc opératoire (CPA)',
    };
    return `${urgLabel}${labels[type]}`;
  }
}

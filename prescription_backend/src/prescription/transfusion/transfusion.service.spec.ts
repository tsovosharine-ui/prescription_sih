import { TransfusionService } from './transfusion.service';

describe('TransfusionService', () => {
  let service: TransfusionService;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    mockCreate = jest.fn().mockResolvedValue({
      id: 'transfusion-1',
      patientId: 'patient-1',
      prescripteurId: 'user-1',
      urgence: 'u',
      alertes: 'Allergie',
      renseignements: 'Anémie sévère',
      atcdTransfusion: true,
      incident: 'Aucun',
      groupage: 'O+',
      hb: 6.5,
      produit: 'cgr',
      plaquettes: null,
      quantite: '2 unités',
      datePrevue: new Date('2026-05-15'),
      notes: 'Urgent',
    });
    const prismaMock = {
      prescriptionTransfusion: {
        create: mockCreate,
      },
    } as any;
    service = new TransfusionService(prismaMock);
  });

  it('should create a transfusion prescription', async () => {
    const dto = {
      patientId: 'patient-1',
      urgence: 'u',
      alertes: 'Allergie',
      renseignements: 'Anémie sévère',
      atcdTransfusion: true,
      incident: 'Aucun',
      groupage: 'O+',
      hb: 6.5,
      produit: 'cgr',
      quantite: '2 unités',
      datePrevue: '2026-05-15',
      notes: 'Urgent',
    };

    const result = await service.create('user-1', dto);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('id', 'transfusion-1');
    expect(result.groupage).toBe('O+');
    expect(result.hb).toBe(6.5);
  });
});

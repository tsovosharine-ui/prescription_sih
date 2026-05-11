import { NonMedicaleService } from './non-medicale.service';

describe('NonMedicaleService', () => {
  let service: NonMedicaleService;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    mockCreate = jest.fn().mockResolvedValue({
      id: 'prescription-nm-1',
      patientId: 'patient-1',
      prescripteurId: 'user-1',
      statut: 'ACTIVE',
      items: [
        { type: 'regime', typeLabel: 'Régime alimentaire', description: 'Sans sel', duree: '7 jours' },
      ],
    });
    const prismaMock = {
      prescriptionNonMedicale: {
        create: mockCreate,
      },
    } as any;
    service = new NonMedicaleService(prismaMock);
  });

  it('should create a non-medical prescription with items', async () => {
    const dto = {
      patientId: 'patient-1',
      notifierInfirmier: false,
      items: [
        {
          type: 'regime',
          typeLabel: 'Régime alimentaire',
          description: 'Sans sel',
          duree: '7 jours',
        },
      ],
    };

    const result = await service.create('user-1', dto);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        patientId: 'patient-1',
        notifierInfirmier: false,
        prescripteurId: 'user-1',
        items: {
          create: dto.items,
        },
      },
      include: { items: true },
    });
    expect(result).toHaveProperty('id', 'prescription-nm-1');
    expect(result.items).toHaveLength(1);
    expect(result.items[0].type).toBe('regime');
  });
});

import { SurveillanceService } from './surveillance.service';

describe('SurveillanceService', () => {
  let service: SurveillanceService;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    mockCreate = jest.fn().mockResolvedValue({
      id: 'surveillance-1',
      patientId: 'patient-1',
      prescripteurId: 'user-1',
      notes: 'Test notes',
      notifierInfirmier: false,
      statut: 'ACTIVE',
      parametres: [
        {
          parametre: 'ta',
          frequence: '1× par jour',
          duree: '7 jours',
          seuil: '> 160/90',
        },
      ],
    });
    const prismaMock = {
      prescriptionSurveillance: {
        create: mockCreate,
      },
    } as any;
    service = new SurveillanceService(prismaMock);
  });

  it('should create a surveillance prescription with parametres', async () => {
    const dto = {
      patientId: 'patient-1',
      notes: 'Test notes',
      notifierInfirmier: false,
      parametres: [
        {
          parametre: 'ta',
          frequence: '1× par jour',
          duree: '7 jours',
          seuil: '> 160/90',
        },
      ],
    };

    const result = await service.create('user-1', dto);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        patientId: 'patient-1',
        notes: 'Test notes',
        notifierInfirmier: false,
        prescripteurId: 'user-1',
        parametres: {
          create: dto.parametres,
        },
      },
      include: { parametres: true },
    });
    expect(result).toHaveProperty('id', 'surveillance-1');
    expect(result.parametres).toHaveLength(1);
  });
});

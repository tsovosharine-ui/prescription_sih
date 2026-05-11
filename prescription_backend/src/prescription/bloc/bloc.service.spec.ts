import { BlocService } from './bloc.service';

describe('BlocService', () => {
  let service: BlocService;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    mockCreate = jest.fn().mockResolvedValue({
      id: 'bloc-1',
      patientId: 'patient-1',
      prescripteurId: 'user-1',
      urgence: 'n',
      alertes: 'Diabète',
      renseignements: 'Fracture ouverte jambe droite',
      libelle: 'Ostéosynthèse',
      risqueHemorragique: 'Modéré',
      typeChirurgie: 'Orthopédique',
      chirurgien: 'Dr. RAKOTO',
      consignes: 'Matériel spécifique nécessaire',
      dateIntervention: new Date('2026-05-20'),
    });
    const prismaMock = {
      prescriptionBloc: {
        create: mockCreate,
      },
    } as any;
    service = new BlocService(prismaMock);
  });

  it('should create a bloc prescription', async () => {
    const dto = {
      patientId: 'patient-1',
      urgence: 'n',
      alertes: 'Diabète',
      renseignements: 'Fracture ouverte jambe droite',
      libelle: 'Ostéosynthèse',
      risqueHemorragique: 'Modéré',
      typeChirurgie: 'Orthopédique',
      chirurgien: 'Dr. RAKOTO',
      consignes: 'Matériel spécifique nécessaire',
      dateIntervention: '2026-05-20',
    };

    const result = await service.create('user-1', dto);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('id', 'bloc-1');
    expect(result.libelle).toBe('Ostéosynthèse');
    expect(result.risqueHemorragique).toBe('Modéré');
  });
});

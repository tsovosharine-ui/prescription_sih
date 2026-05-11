import { MedicaleService } from './medicale.service';

describe('MedicaleService', () => {
  let service: MedicaleService;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    mockCreate = jest.fn().mockResolvedValue({
      id: 'prescription-1',
      patientId: 'patient-1',
      prescripteurId: 'user-1',
      statut: 'ACTIVE',
      medicaments: [
        { nom: 'Paracétamol', dose: '500 mg', quantite: 2, frequence: '3× par jour', duree: '7 jours' },
      ],
    });
    const prismaMock = {
      prescriptionMedicale: {
        create: mockCreate,
      },
    } as any;
    service = new MedicaleService(prismaMock);
  });

  it('should create a prescription with medicaments', async () => {
    const dto = {
      patientId: 'patient-1',
      remarques: 'Test',
      notifierInfirmier: false,
      medicaments: [
        {
          nom: 'Paracétamol',
          dose: '500 mg',
          quantite: 2,
          frequence: '3× par jour',
          duree: '7 jours',
        },
      ],
    };

    const result = await service.create('user-1', dto);

    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(result).toHaveProperty('id', 'prescription-1');
    expect(result.medicaments).toHaveLength(1);
  });
});

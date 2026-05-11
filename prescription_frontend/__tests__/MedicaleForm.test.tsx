import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MedicaleForm from '../components/prescription/MedicaleForm';

jest.mock('@/lib/api', () => ({
  creerPrescriptionMedicale: jest.fn().mockResolvedValue({ id: 'test-1' }),
  getPrescriptionsPatient: jest.fn().mockResolvedValue([]),
  notifierInfirmierMedicale: jest.fn().mockResolvedValue({}),
  updateStatutPrescription: jest.fn().mockResolvedValue({}),
}));
jest.mock('@/lib/printPrescription', () => ({
  openSummaryWindow: jest.fn(),
}));

describe('MedicaleForm', () => {
  it('affiche le champ de recherche de médicament', async () => {
    render(
      <MedicaleForm
        patient={{ id: 'patient-1', nom: 'Dupont', prenom: 'Jean' }}
        prescripteur={{ nom: 'Martin', prenom: 'Paul', service: 'Cardio' }}
      />
    );
    const input = await screen.findByPlaceholderText('Rechercher dans le stock pharmacie...');
    expect(input).toBeInTheDocument();
  });

  it('affiche le bouton Ajouter à la prescription', async () => {
    render(
      <MedicaleForm
        patient={{ id: 'patient-1', nom: 'Dupont', prenom: 'Jean' }}
        prescripteur={{ nom: 'Martin', prenom: 'Paul', service: 'Cardio' }}
      />
    );
    const button = await screen.findByText('Ajouter à la prescription');
    expect(button).toBeInTheDocument();
  });

  it('le bouton Valider est désactivé si aucun médicament ajouté', async () => {
    render(
      <MedicaleForm
        patient={{ id: 'patient-1', nom: 'Dupont', prenom: 'Jean' }}
        prescripteur={{ nom: 'Martin', prenom: 'Paul', service: 'Cardio' }}
      />
    );
    const validerBtn = await screen.findByText('Valider la prescription');
    expect(validerBtn).toHaveStyle({ opacity: '0.5' });
  });
});

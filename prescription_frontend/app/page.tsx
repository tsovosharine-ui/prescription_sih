"use client";

import { useState, useEffect } from 'react';
import PrescriptionLayout, { Section } from '@/components/prescription/PrescriptionLayout';
import MedicaleForm from '@/components/prescription/MedicaleForm';
import NonMedicaleForm from '@/components/prescription/NonMedicaleForm';
import SurveillanceForm from '@/components/prescription/SurveillanceForm';
import TransfusionForm from '@/components/prescription/TransfusionForm';
import LaboForm from '@/components/prescription/para/LaboForm';
import ImagerieForm from '@/components/prescription/para/ImagerieForm';
import AnapathForm from '@/components/prescription/para/AnapathForm';
import EEGForm from '@/components/prescription/para/EEGForm';
import KineForm from '@/components/prescription/para/KineForm';
import DiaryseForm from '@/components/prescription/para/DiaryseForm';
import EndoscopieForm from '@/components/prescription/para/EndoscopieForm';
import BlocForm from '@/components/prescription/BlocForm';
import { login } from '@/lib/api';

const API_URL = 'http://localhost:3001';

async function fetchWithToken(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

async function getValidToken(): Promise<string> {
  const stored = localStorage.getItem('token');
  if (stored) {
    // Vérifier si le token est encore valide
    try {
      await fetchWithToken(`${API_URL}/auth/profile`, stored);
      return stored;
    } catch {
      // Token expiré ou invalide — on refait le login
      localStorage.removeItem('token');
    }
  }
  const auth = await login('jean@chu.mg', 'test1234');
  localStorage.setItem('token', auth.access_token);
  return auth.access_token;
}

export default function Home() {
  const [patient, setPatient] = useState<any>(null);
  const [prescripteur, setPrescripteur] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function init() {
      try {
        const token = await getValidToken();

        const [patientData, userData] = await Promise.all([
          fetchWithToken(`${API_URL}/patients/permanent/IP-2026-00001`, token),
          fetchWithToken(`${API_URL}/auth/profile`, token),
        ]);
        setPatient(patientData);
        setPrescripteur(userData);
      } catch (err: any) {
        console.error("ERREUR:", err?.message, err);
        setError("Impossible de charger les données : " + err?.message);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading) return <div style={{ padding: 20 }}>Chargement...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;

  return (
    <PrescriptionLayout patient={patient} prescripteur={prescripteur}>
      {(section: Section) => {
        switch (section) {
          case 'med':   return <MedicaleForm   patient={patient} prescripteur={prescripteur} />;
          case 'nm':    return <NonMedicaleForm patient={patient} prescripteur={prescripteur} />;
          case 'surv':  return <SurveillanceForm patient={patient} prescripteur={prescripteur} />;
          case 'trans': return <TransfusionForm patient={patient} prescripteur={prescripteur} />;
          case 'labo':  return <LaboForm        patient={patient} prescripteur={prescripteur} />;
          case 'imag':  return <ImagerieForm    patient={patient} prescripteur={prescripteur} />;
          case 'ana':   return <AnapathForm     patient={patient} prescripteur={prescripteur} />;
          case 'eeg':   return <EEGForm         patient={patient} prescripteur={prescripteur} />;
          case 'kine':  return <KineForm        patient={patient} prescripteur={prescripteur} />;
          case 'dial':  return <DiaryseForm     patient={patient} prescripteur={prescripteur} />;
          case 'endo':  return <EndoscopieForm  patient={patient} prescripteur={prescripteur} />;
          case 'bloc':  return <BlocForm        patient={patient} prescripteur={prescripteur} />;
          default: return (
            <div style={{textAlign:'center',padding:'40px',color:'var(--txt3)',fontSize:'14px'}}>
              Section en cours de développement
            </div>
          );
        }
      }}
    </PrescriptionLayout>
  );
}

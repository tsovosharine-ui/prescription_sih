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
import HistoriqueForm from '@/components/prescription/HistoriqueForm';
import { getToken, setToken } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchWithToken(url: string, token: string) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export default function Home() {
  const [patient, setPatient] = useState<any>(null);
  const [prescripteur, setPrescripteur] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState('');

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setDataLoading(true);
    setDataError('');
    try {
      let token = getToken();
      if (!token) {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'jean@chu.mg', password: 'test1234' }),
        });
        if (!res.ok) throw new Error('Connexion automatique échouée');
        const data = await res.json();
        token = data.access_token;
        setToken(token!);
      }
      const [patientData, userData] = await Promise.all([
        fetchWithToken(`${API_URL}/patients/permanent/IP-2026-00001`, token!),
        fetchWithToken(`${API_URL}/auth/profile`, token!),
      ]);
      setPatient(patientData);
      setPrescripteur(userData);
    } catch (err: any) {
      setDataError('Impossible de charger les données : ' + err?.message);
    } finally {
      setDataLoading(false);
    }
  }

  if (dataLoading) {
    return (
      <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{textAlign:'center',color:'var(--txt3)'}}>
          <span className="ms" style={{fontSize:40,display:'block',marginBottom:12}}>hourglass_top</span>
          Chargement...
        </div>
      </div>
    );
  }

  if (dataError) {
    return (
      <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className="card" style={{maxWidth:400,padding:24,textAlign:'center'}}>
          <span className="ms" style={{fontSize:40,color:'var(--red)',display:'block',marginBottom:12}}>error</span>
          <p style={{color:'var(--red)',fontSize:13}}>{dataError}</p>
          <button className="bp" style={{marginTop:16}} onClick={loadData}>
            <span className="ms">refresh</span> Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <PrescriptionLayout patient={patient} prescripteur={prescripteur}>
        {(section: Section) => {
          switch (section) {
            case 'med':   return <MedicaleForm    patient={patient} prescripteur={prescripteur} />;
            case 'nm':    return <NonMedicaleForm  patient={patient} prescripteur={prescripteur} />;
            case 'surv':  return <SurveillanceForm patient={patient} prescripteur={prescripteur} />;
            case 'trans': return <TransfusionForm  patient={patient} prescripteur={prescripteur} />;
            case 'bloc':  return <BlocForm         patient={patient} prescripteur={prescripteur} />;
            case 'labo':  return <LaboForm         patient={patient} prescripteur={prescripteur} />;
            case 'imag':  return <ImagerieForm     patient={patient} prescripteur={prescripteur} />;
            case 'ana':   return <AnapathForm      patient={patient} prescripteur={prescripteur} />;
            case 'eeg':   return <EEGForm          patient={patient} prescripteur={prescripteur} />;
            case 'kine':  return <KineForm         patient={patient} prescripteur={prescripteur} />;
            case 'dial':  return <DiaryseForm      patient={patient} prescripteur={prescripteur} />;
            case 'endo':  return <EndoscopieForm   patient={patient} prescripteur={prescripteur} />;
            case 'hist':  return <HistoriqueForm   patient={patient} prescripteur={prescripteur} />;
            default: return (
              <div style={{textAlign:'center',padding:'40px',color:'var(--txt3)',fontSize:'14px'}}>
                Section en cours de développement
              </div>
            );
          }
        }}
      </PrescriptionLayout>
    </div>
  );
}

"use client";
import { useState, useEffect } from 'react';
import { login, setToken, getToken } from '@/lib/api';
import PrescriptionLayout, { Section } from '@/components/prescription/PrescriptionLayout';
import MedicaleForm from '@/components/prescription/MedicaleForm';
import NonMedicaleForm from '@/components/prescription/NonMedicaleForm';
import SurveillanceForm from '@/components/prescription/SurveillanceForm';
import TransfusionForm from '@/components/prescription/TransfusionForm';
import BlocForm from '@/components/prescription/BlocForm';
import LaboForm from '@/components/prescription/para/LaboForm';
import ImagerieForm from '@/components/prescription/para/ImagerieForm';
import AnapathForm from '@/components/prescription/para/AnapathForm';
import EEGForm from '@/components/prescription/para/EEGForm';
import KineForm from '@/components/prescription/para/KineForm';
import DiaryseForm from '@/components/prescription/para/DiaryseForm';
import EndoscopieForm from '@/components/prescription/para/EndoscopieForm';

const PATIENT = {
  id: "363d3eba-b7f3-41df-8109-ee1250e58b9f",
  idPermanent: 'IP-2026-00001',
  nom: 'RAKOTO',
  prenom: 'Jean-Pierre',
  sexe: 'M',
  service: 'Hospitalisation — Médecine interne',
  allergies: ['Pénicilline'],
};

const PRESCRIPTEUR = {
  id: "363d3eba-b7f3-41df-8109-ee1250e58b9f",
  nom: 'RAKOTO',
  prenom: 'Jean',
  poste: 'Médecin',
};

function SectionContent({ section }: { section: Section }) {
  switch (section) {
    case 'med':   return <MedicaleForm     patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'nm':    return <NonMedicaleForm  patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'surv':  return <SurveillanceForm patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'trans': return <TransfusionForm  patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'bloc':  return <BlocForm         patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'labo':  return <LaboForm         patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'imag':  return <ImagerieForm     patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'ana':   return <AnapathForm      patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'eeg':   return <EEGForm          patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'kine':  return <KineForm         patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'dial':  return <DiaryseForm      patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    case 'endo':  return <EndoscopieForm   patient={PATIENT} prescripteur={PRESCRIPTEUR} />;
    default: return (
      <div style={{textAlign:'center',padding:'40px',color:'var(--txt3)',fontSize:'14px'}}>
        Section en cours de développement
      </div>
    );
  }
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) setIsLoggedIn(true);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      setToken(data.access_token);
      setIsLoggedIn(true);
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)'}}>
        <div className="card" style={{width:'100%',maxWidth:'400px',padding:'32px'}}>
          <div style={{textAlign:'center',marginBottom:'24px'}}>
            <div style={{width:'56px',height:'56px',borderRadius:'16px',background:'var(--navy)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 12px'}}>
              <span className="ms" style={{color:'#fff',fontSize:'28px'}}>local_hospital</span>
            </div>
            <h1 style={{fontFamily:'Manrope,sans-serif',fontSize:'20px',fontWeight:'800',color:'var(--txt)'}}>SIH CHU Andrainjato</h1>
            <p style={{fontSize:'13px',color:'var(--txt3)',marginTop:'4px'}}>Module Prescriptions</p>
          </div>
          <div className="mb12">
            <label className="lbl">Email</label>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="jean@chu.mg" onKeyDown={e => e.key==='Enter' && handleLogin()}/>
          </div>
          <div className="mb12">
            <label className="lbl">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key==='Enter' && handleLogin()}/>
          </div>
          {error && (
            <div style={{background:'var(--red-lt)',border:'1px solid var(--red-bdr)',borderRadius:'8px',padding:'10px 12px',fontSize:'12px',color:'var(--red)',marginBottom:'12px'}}>
              {error}
            </div>
          )}
          <button className="bp" onClick={handleLogin} style={{opacity:loading?0.7:1}}>
            <span className="ms">login</span>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <PrescriptionLayout patient={PATIENT} prescripteur={PRESCRIPTEUR}>
        {(section) => <SectionContent section={section} />}
      </PrescriptionLayout>
    </div>
  );
}

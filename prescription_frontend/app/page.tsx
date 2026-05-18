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
import { login, getToken, setToken, removeToken } from '@/lib/api';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchWithToken(url: string, token: string) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState<any>(null);
  const [prescripteur, setPrescripteur] = useState<any>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    const token = getToken();
    if (token) {
      loadData(token);
    }
  }, []);

  async function loadData(token: string) {
    setDataLoading(true);
    setDataError('');
    try {
      const [patientData, userData] = await Promise.all([
        fetchWithToken(`${API_URL}/patients/permanent/IP-2026-00001`, token),
        fetchWithToken(`${API_URL}/auth/profile`, token),
      ]);
      setPatient(patientData);
      setPrescripteur(userData);
      setIsLoggedIn(true);
    } catch (err: any) {
      // Token expiré ou invalide → retour au login
      if (err?.message === '401') {
        removeToken();
        setIsLoggedIn(false);
      } else {
        setDataError('Impossible de charger les données : ' + err?.message);
      }
    } finally {
      setDataLoading(false);
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      setToken(data.access_token);
      await loadData(data.access_token);
    } catch {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  // Chargement initial
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

  // Erreur chargement (pas 401)
  if (dataError) {
    return (
      <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div className="card" style={{maxWidth:400,padding:24,textAlign:'center'}}>
          <span className="ms" style={{fontSize:40,color:'var(--red)',display:'block',marginBottom:12}}>error</span>
          <p style={{color:'var(--red)',fontSize:13}}>{dataError}</p>
          <button className="bp" style={{marginTop:16}} onClick={() => loadData(getToken()!)}>
            <span className="ms">refresh</span> Réessayer
          </button>
        </div>
      </div>
    );
  }

  // Écran de connexion
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
            <input type="text" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="jean@chu.mg" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          <div className="mb12">
            <label className="lbl">Mot de passe</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          {error && (
            <div style={{background:'var(--red-lt)',border:'1px solid var(--red-bdr)',borderRadius:'8px',padding:'10px 12px',fontSize:'12px',color:'var(--red)',marginBottom:'12px'}}>
              {error}
            </div>
          )}
          <button className="bp" onClick={handleLogin} style={{opacity: loading ? 0.7 : 1}}>
            <span className="ms">login</span>
            {loading ? 'Connexion...' : 'Se connecter'}
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
            case 'hist':  return <HistoriqueForm   patient={patient} prescripteur={prescripteur} />;
            case 'labo':  return <LaboForm         patient={patient} prescripteur={prescripteur} />;
            case 'imag':  return <ImagerieForm     patient={patient} prescripteur={prescripteur} />;
            case 'ana':   return <AnapathForm      patient={patient} prescripteur={prescripteur} />;
            case 'eeg':   return <EEGForm          patient={patient} prescripteur={prescripteur} />;
            case 'kine':  return <KineForm         patient={patient} prescripteur={prescripteur} />;
            case 'dial':  return <DiaryseForm      patient={patient} prescripteur={prescripteur} />;
            case 'endo':  return <EndoscopieForm   patient={patient} prescripteur={prescripteur} />;
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

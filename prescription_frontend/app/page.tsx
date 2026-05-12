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
import { login, getToken, setToken, getCurrentUser } from '@/lib/api';

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
    if (getToken()) {
      setIsLoggedIn(true);
      loadData(getToken()!);
    }
  }, []);

  async function loadData(token: string) {
    setDataLoading(true);
    setDataError('');
    try {
      // Récupère le premier patient de la liste dynamiquement
      const [patients, userData] = await Promise.all([
        fetchWithToken(`${API_URL}/patients`, token),
        fetchWithToken(`${API_URL}/auth/profile`, token),
      ]);
      // Prend le premier patient disponible
      const firstPatient = Array.isArray(patients) && patients.length > 0 ? patients[0] : null;
      setPatient(firstPatient);
      setPrescripteur(userData);
    } catch (err: any) {
      setDataError('Impossible de charger les données : ' + err?.message);
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
      setIsLoggedIn(true);
      await loadData(data.access_token);
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

  if (dataLoading) {
    return (
      <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)'}}>
        <div style={{textAlign:'center',color:'var(--txt3)',fontSize:'14px'}}>
          <span className="ms" style={{fontSize:'32px',display:'block',marginBottom:'12px'}}>hourglass_empty</span>
          Chargement des données...
        </div>
      </div>
    );
  }

  if (dataError || !patient) {
    return (
      <div style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)'}}>
        <div className="card" style={{maxWidth:'400px',padding:'24px',textAlign:'center'}}>
          <span className="ms" style={{fontSize:'32px',color:'var(--red)',display:'block',marginBottom:'12px'}}>error</span>
          <p style={{fontSize:'14px',color:'var(--txt2)'}}>{dataError || 'Aucun patient trouvé.'}</p>
          <button className="bp" style={{marginTop:'16px'}} onClick={() => loadData(getToken()!)}>
            <span className="ms">refresh</span>Réessayer
          </button>
        </div>
      </div>
    );
  }

  function SectionContent({ section }: { section: Section }) {
    const props = { patient, prescripteur };
    switch (section) {
      case 'med':   return <MedicaleForm {...props} />;
      case 'nm':    return <NonMedicaleForm {...props} />;
      case 'surv':  return <SurveillanceForm {...props} />;
      case 'trans': return <TransfusionForm {...props} />;
      case 'labo':  return <LaboForm {...props} />;
      case 'imag':  return <ImagerieForm {...props} />;
      case 'ana':   return <AnapathForm {...props} />;
      case 'eeg':   return <EEGForm {...props} />;
      case 'kine':  return <KineForm {...props} />;
      case 'dial':  return <DiaryseForm {...props} />;
      case 'endo':  return <EndoscopieForm {...props} />;
      case 'bloc':  return <BlocForm {...props} />;
      default:      return <MedicaleForm {...props} />;
    }
  }

  return (
    <div style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden'}}>
      <PrescriptionLayout patient={patient} prescripteur={prescripteur}>
        {(section) => <SectionContent section={section} />}
      </PrescriptionLayout>
    </div>
  );
}

"use client";

import { useState } from 'react';

export type Section = 
  | 'med' | 'nm' | 'surv' | 'trans' 
  | 'labo' | 'imag' | 'eeg' | 'kine' | 'endo' | 'dial' | 'ana' 
  | 'bloc' | 'para';

interface PrescriptionLayoutProps {
  patient?: { nom?: string; prenom?: string; age?: number; idPermanent?: string; allergies?: string[] };
  prescripteur?: { nom?: string; prenom?: string; service?: string };
  children: (activeSection: Section) => React.ReactNode;
}

export default function PrescriptionLayout({ patient, prescripteur, children }: PrescriptionLayoutProps) {
  const [activeSection, setActiveSection] = useState<Section>('med');
  const [activeParaSection, setActiveParaSection] = useState<Section>('labo');

  const mainItems = [
    {id:'med', icon:'medication', label:'Médicamenteuse'},
    {id:'nm', icon:'self_care', label:'Non Médicamenteuse'},
    {id:'surv', icon:'monitor_heart', label:'Surveillance'},
    {id:'trans', icon:'bloodtype', label:'Transfusion'},
    {id:'para', icon:'biotech', label:'Para-clinique'},
    {id:'bloc', icon:'medical_services', label:'Bloc Opératoire'},
  ];

  const paraItems = [
    {id:'labo', icon:'science', label:'Laboratoire'},
    {id:'imag', icon:'radiology', label:'Imagerie'},
    {id:'eeg', icon:'neurology', label:'EEG'},
    {id:'kine', icon:'exercise', label:'Kinésithérapie'},
    {id:'endo', icon:'visibility', label:'Endoscopie'},
    {id:'dial', icon:'water_full', label:'Dialyse'},
    {id:'ana', icon:'biotech', label:'Anapath'},
  ];

  const currentSection = activeSection === 'para' ? activeParaSection : activeSection;

  return (
    <div style={{display:'flex', flexDirection:'column', flex:1, overflow:'hidden'}}>

      {/* HEADER BLEU */}
      <div style={{background:'var(--navy)', flexShrink:0, padding:'0 16px'}}>
        <div style={{maxWidth:'900px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:52}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <button style={{background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', padding:0}} onClick={() => window.history.back()}>
              <span className="ms" style={{fontSize:22, color:'#fff'}}>arrow_back_ios</span>
            </button>
            <span style={{color:'#fff', fontSize:17, fontWeight:700, letterSpacing:'.2px'}}>Prescriptions</span>
            {prescripteur && (
              <span style={{color:'rgba(255,255,255,0.7)', fontSize:12, marginLeft:8}}>
                Dr {prescripteur.nom || prescripteur.prenom} — {prescripteur.service}
              </span>
            )}
          </div>
          <div style={{width:34, height:34, borderRadius:'50%', background:'rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:15, fontWeight:700}}>N</div>
        </div>
      </div>

      {/* BARRE PATIENT */}
      {patient && (
        <div style={{background:'var(--card)', borderBottom:'1px solid var(--bdr)', flexShrink:0, padding:'0 16px'}}>
          <div style={{maxWidth:'900px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', height:48, gap:12}}>
            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <span style={{background:'var(--navy)', color:'#fff', fontSize:11, fontWeight:700, borderRadius:6, padding:'3px 8px', letterSpacing:'.5px', flexShrink:0}}>{patient.idPermanent || 'IP-2026-00001'}</span>
              <div>
                <span style={{fontSize:14, fontWeight:700, color:'var(--txt)'}}>{patient.nom} {patient.prenom}</span>
                <span style={{fontSize:12, color:'var(--txt3)', marginLeft:8}}>{patient.age} ans · Hospitalisation</span>
              </div>
            </div>
            {patient.allergies && patient.allergies.length > 0 && (
              <div style={{display:'flex', alignItems:'center', gap:5, background:'#fef3c7', border:'1px solid #fbbf24', borderRadius:8, padding:'4px 10px', flexShrink:0}}>
                <span className="ms" style={{fontSize:14, color:'#d97706'}}>warning</span>
                <span style={{fontSize:12, fontWeight:600, color:'#92400e'}}>Allergie : {patient.allergies.join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NAVIGATION PRINCIPALE */}
      <div style={{background:'var(--card)', borderBottom:'1px solid var(--bdr)', flexShrink:0, boxShadow:'0 2px 8px rgba(0,0,0,.04)'}}>
        <div style={{maxWidth:'900px', margin:'0 auto', display:'flex', alignItems:'stretch', overflowX:'auto'}}>
          {mainItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              style={{
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                gap:'5px', padding:'12px 20px', border:'none',
                borderBottom: activeSection === item.id ? '3px solid var(--navy)' : '3px solid transparent',
                background:'none', cursor:'pointer',
                color: activeSection === item.id ? 'var(--navy)' : 'var(--txt3)',
                fontFamily:'DM Sans, sans-serif', fontSize:'12px',
                fontWeight: activeSection === item.id ? '700' : '500',
                whiteSpace:'nowrap', transition:'all .15s', flexShrink:0,
              }}
            >
              <span className="ms" style={{fontSize:'20px', color: activeSection === item.id ? 'var(--navy)' : 'var(--txt3)'}}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* SOUS-NAVIGATION PARA-CLINIQUE */}
      {activeSection === 'para' && (
        <div style={{background:'var(--navy-lt)', borderBottom:'2px solid var(--navy-mid)', flexShrink:0}}>
          <div style={{maxWidth:'900px', margin:'0 auto', display:'flex', alignItems:'stretch', overflowX:'auto'}}>
            {paraItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveParaSection(item.id as Section)}
                style={{
                  display:'flex', alignItems:'center', gap:'7px',
                  padding:'10px 16px', border:'none',
                  borderBottom: activeParaSection === item.id ? '3px solid var(--navy)' : '3px solid transparent',
                  background:'none', cursor:'pointer',
                  color: activeParaSection === item.id ? 'var(--navy)' : 'var(--txt2)',
                  fontFamily:'DM Sans, sans-serif', fontSize:'12px',
                  fontWeight: activeParaSection === item.id ? '700' : '500',
                  whiteSpace:'nowrap', transition:'all .15s', flexShrink:0,
                }}
              >
                <span className="ms" style={{fontSize:'16px', color: activeParaSection === item.id ? 'var(--navy)' : 'var(--txt3)'}}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CONTENU */}
      <div style={{flex:1, overflowY:'auto', padding:'24px 16px', background:'var(--bg)'}}>
        <div className="mi">
          {children(currentSection)}
        </div>
      </div>

    </div>
  );
}

'use client';
import { useState, useEffect, useRef } from 'react';

interface Patient {
  id?: string;
  idPermanent?: string;
  nom?: string;
  prenom?: string;
  sexe?: string;
  dateNaissance?: string;
  allergies?: string[];
  service?: string;
}

interface Prescripteur {
  id?: string;
  nom?: string;
  prenom?: string;
  poste?: string;
}

export type Section =
  | 'med' | 'nm' | 'surv' | 'trans'
  | 'labo' | 'imag' | 'eeg' | 'kine' | 'endo' | 'dial' | 'ana'
  | 'bloc' | 'para';

interface PrescriptionLayoutProps {
  patient?: Patient;
  prescripteur?: Prescripteur;
  children: (activeSection: Section) => React.ReactNode;
}

const mainItems = [
  {id:'med',   icon:'medication',       label:'Médicamenteuse'},
  {id:'nm',    icon:'self_care',        label:'Non Médicamenteuse'},
  {id:'surv',  icon:'monitor_heart',    label:'Surveillance'},
  {id:'trans', icon:'bloodtype',        label:'Transfusion'},
  {id:'para',  icon:'biotech',          label:'Para-clinique'},
  {id:'bloc',  icon:'medical_services', label:'Bloc Opératoire'},
];

const paraItems = [
  {id:'labo', icon:'science',     label:'Laboratoire'},
  {id:'imag', icon:'radiology',   label:'Imagerie'},
  {id:'eeg',  icon:'neurology',   label:'EEG'},
  {id:'kine', icon:'exercise',    label:'Kinésithérapie'},
  {id:'endo', icon:'visibility',  label:'Endoscopie'},
  {id:'dial', icon:'water_full',  label:'Dialyse'},
  {id:'ana',  icon:'biotech',     label:'Anapath'},
];

export default function PrescriptionLayout({ children, patient, prescripteur }: PrescriptionLayoutProps) {
  const [activeSection, setActiveSection] = useState<Section>('med');
  const [activeParaSection, setActiveParaSection] = useState<Section>('labo');
  const [prevSection, setPrevSection] = useState<Section>('med');
  const [animating, setAnimating] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentSection = activeSection === 'para' ? activeParaSection : activeSection;

  const initiale = prescripteur?.nom?.[0]?.toUpperCase() || 'M';
  const patientNom = patient ? `${patient.nom || ''} ${patient.prenom || ''}`.trim() : 'Patient';
  const patientId = patient?.idPermanent || 'IP-2026-00001';
  const allergie = patient?.allergies?.[0] || null;
  const age = patient?.dateNaissance
    ? Math.floor((Date.now() - new Date(patient.dateNaissance).getTime()) / 31557600000)
    : null;

  function changeSection(id: Section) {
    if (id === activeSection) return;
    setPrevSection(activeSection);
    setAnimating(true);
    setTimeout(() => {
      setActiveSection(id);
      setContentKey(k => k + 1);
      setAnimating(false);
    }, 180);
  }

  function changeParaSection(id: Section) {
    if (id === activeParaSection) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveParaSection(id);
      setContentKey(k => k + 1);
      setAnimating(false);
    }, 180);
  }

  return (
    <>
      <style>{`
        .pl-root {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
          background: var(--bg);
        }

        /* HEADER */
        .pl-hdr {
          background: var(--navy);
          flex-shrink: 0;
          box-shadow: 0 2px 16px rgba(0,31,92,.4);
          position: relative;
          z-index: 10;
        }
        .pl-hdr-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 54px;
          padding: 0 16px;
        }
        .pl-back-btn {
          background: rgba(255,255,255,.12);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          transition: background .15s, transform .15s;
        }
        .pl-back-btn:hover { background: rgba(255,255,255,.22); transform: translateX(-2px); }
        .pl-back-btn:active { transform: translateX(-4px) scale(.95); }
        .pl-title {
          color: #fff;
          font-size: 17px;
          font-weight: 700;
          margin-left: 10px;
          font-family: 'Manrope', sans-serif;
        }
        .pl-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,.18);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 15px; font-weight: 700;
          border: 2px solid rgba(255,255,255,.3);
          cursor: pointer;
          transition: background .15s, transform .15s;
          font-family: 'Manrope', sans-serif;
        }
        .pl-avatar:hover { background: rgba(255,255,255,.28); transform: scale(1.06); }

        /* BANNER */
        .pl-banner {
          background: var(--card);
          border-bottom: 1px solid var(--bdr);
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,.04);
        }
        .pl-banner-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .pl-banner-left { display: flex; align-items: center; gap: 10px; }
        .pl-pid {
          background: var(--navy);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          border-radius: 6px;
          padding: 3px 9px;
          letter-spacing: .5px;
          flex-shrink: 0;
          font-family: 'Manrope', sans-serif;
          animation: fadeSlideIn .4s ease;
        }
        .pl-pname {
          font-size: 14px;
          font-weight: 700;
          color: var(--txt);
        }
        .pl-pinfo {
          font-size: 12px;
          color: var(--txt3);
          margin-left: 6px;
        }
        .pl-allergy {
          display: flex; align-items: center; gap: 5px;
          background: #fef3c7;
          border: 1px solid #fbbf24;
          border-radius: 8px;
          padding: 4px 10px;
          flex-shrink: 0;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(251,191,36,.4); }
          50% { box-shadow: 0 0 0 4px rgba(251,191,36,0); }
        }

        /* NAV */
        .pl-nav {
          background: var(--card);
          border-bottom: 1px solid var(--bdr);
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,.04);
        }
        .pl-nav-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .pl-nav-inner::-webkit-scrollbar { display: none; }
        .pl-nav-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          padding: 10px 18px;
          border: none;
          border-bottom: 3px solid transparent;
          background: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          color: var(--txt3);
          white-space: nowrap;
          flex-shrink: 0;
          transition: color .2s, border-color .2s;
          position: relative;
        }
        .pl-nav-btn .ms { font-size: 20px; transition: transform .2s, color .2s; }
        .pl-nav-btn:hover { color: var(--navy); }
        .pl-nav-btn:hover .ms { transform: translateY(-2px); color: var(--navy); }
        .pl-nav-btn.active {
          color: var(--navy);
          border-bottom-color: var(--navy);
          font-weight: 700;
        }
        .pl-nav-btn.active .ms { color: var(--navy); transform: translateY(-1px); }
        .pl-nav-btn::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; right: 50%;
          height: 3px;
          background: var(--navy);
          border-radius: 3px 3px 0 0;
          transition: left .25s, right .25s;
        }
        .pl-nav-btn.active::after { left: 0; right: 0; }

        /* PARA NAV */
        .pl-para-nav {
          background: var(--navy-lt);
          border-bottom: 2px solid var(--navy-mid);
          flex-shrink: 0;
          animation: slideDown .2s ease;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pl-para-nav-inner {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          align-items: stretch;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0 4px;
        }
        .pl-para-nav-inner::-webkit-scrollbar { display: none; }
        .pl-para-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 9px 14px;
          border: none;
          background: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: var(--navy);
          white-space: nowrap;
          flex-shrink: 0;
          border-bottom: 2px solid transparent;
          transition: all .18s;
          opacity: .65;
        }
        .pl-para-btn .ms { font-size: 16px; }
        .pl-para-btn:hover { opacity: 1; }
        .pl-para-btn.active {
          font-weight: 700;
          opacity: 1;
          border-bottom-color: var(--navy);
          background: rgba(0,49,120,.06);
          border-radius: 8px 8px 0 0;
        }

        /* CONTENT */
        .pl-content {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px 32px;
          background: var(--bg);
        }
        .pl-content-inner {
          max-width: 900px;
          margin: 0 auto;
          transition: opacity .18s, transform .18s;
        }
        .pl-content-inner.fade-out {
          opacity: 0;
          transform: translateY(6px);
        }
        .pl-content-inner.fade-in {
          animation: fadeSlideIn .25s ease;
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* RIPPLE BUTTON */
        .pl-nav-btn:active { transform: scale(.97); }
        .pl-para-btn:active { transform: scale(.96); }

        /* RESPONSIVE */
        @media (max-width: 600px) {
          .pl-title { font-size: 15px; }
          .pl-nav-btn { padding: 10px 12px; font-size: 10.5px; }
          .pl-para-btn { padding: 8px 10px; font-size: 11px; }
          .pl-banner-inner { padding: 7px 12px; gap: 8px; }
          .pl-pname { font-size: 13px; }
          .pl-content { padding: 12px 10px 24px; }
        }
      `}</style>

      <div className="pl-root">
        {/* HEADER */}
        <div className="pl-hdr">
          <div className="pl-hdr-inner">
            <div style={{display:'flex', alignItems:'center'}}>
              <button className="pl-back-btn" onClick={() => window.history.back()}>
                <span className="ms" style={{fontSize:20, color:'#fff'}}>arrow_back_ios</span>
              </button>
              <span className="pl-title">Prescriptions</span>
            </div>
            <div className="pl-avatar">{initiale}</div>
          </div>
        </div>

        {/* BANNER PATIENT */}
        <div className="pl-banner">
          <div className="pl-banner-inner">
            <div className="pl-banner-left">
              <span className="pl-pid">{patientId}</span>
              <div>
                <span className="pl-pname">{patientNom}</span>
                <span className="pl-pinfo">
                  {patient?.sexe || 'M'}
                  {age !== null ? ` · ${age} ans` : ''}
                </span>
              </div>
            </div>
            {allergie && (
              <div className="pl-allergy">
                <span className="ms" style={{fontSize:14, color:'#d97706'}}>warning</span>
                <span style={{fontSize:12, fontWeight:600, color:'#92400e'}}>Allergie : {allergie}</span>
              </div>
            )}
          </div>
        </div>

        {/* NAV PRINCIPALE */}
        <div className="pl-nav">
          <div className="pl-nav-inner">
            {mainItems.map(item => (
              <button
                key={item.id}
                className={`pl-nav-btn${activeSection === item.id ? ' active' : ''}`}
                onClick={() => changeSection(item.id as Section)}
              >
                <span className="ms">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* SOUS-NAV PARA */}
        {activeSection === 'para' && (
          <div className="pl-para-nav">
            <div className="pl-para-nav-inner">
              {paraItems.map(item => (
                <button
                  key={item.id}
                  className={`pl-para-btn${activeParaSection === item.id ? ' active' : ''}`}
                  onClick={() => changeParaSection(item.id as Section)}
                >
                  <span className="ms">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CONTENU */}
        <div className="pl-content">
          <div
            key={contentKey}
            className="pl-content-inner fade-in"
            ref={contentRef}
          >
            {children(currentSection)}
          </div>
        </div>
      </div>
    </>
  );
}

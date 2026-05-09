'use client';

import { useState } from 'react';

const CATEGORIES = [
  { id: 'hemato', label: '1. Hématologie & NFS', color: '#7c3aed', textColor: '#6d28d9', tube: 'Tube violet', analyses: ['NFS complète','Réticulocytes','VSH','Frottis sanguin','Groupage ABO / Rh','Test d\'Itano (drépanocytose)'] },
  { id: 'hemostase', label: '2. Hémostase', color: '#0284c7', textColor: '#075985', tube: 'Tube bleu', analyses: ['Temps de saignement (TS)','TQ / TP','INR','TCA','D-Dimères'] },
  { id: 'biochimie', label: '3. Biochimie sérique', color: '#059669', textColor: '#065f46', tube: 'Tube vert', subGroups: [
    { label: 'Métabolisme général', analyses: ['Glucose','HbA1c','Urée','Créatinine','Acide urique','CRP','Protéines totales','Albumine'] },
    { label: 'Bilan hépatique', analyses: ['ASAT (TGO)','ALAT (TGP)','GGT','PAL','Bilirubine totale','Bilirubine directe','LDH'] },
    { label: 'Bilan lipidique & pancréas', analyses: ['Cholestérol total','HDL','LDL','Triglycérides','Lipase','Amylase'] },
    { label: 'Ionogramme & minéraux', analyses: ['Sodium (Na⁺)','Potassium (K⁺)','Calcium','Magnésium','Phosphore','Fer sérique','Ferritine','Troponine'] },
  ]},
  { id: 'serologie', label: '4. Sérologie / Immunologie', color: '#dc2626', textColor: '#991b1b', tube: 'Tube rouge', analyses: ['Hépatite B (Ag HBs)','Hépatite C (Ac anti-VHC)','VIH 1 & 2','Widal & Félix','TPHA','VDRL / RPR','Toxoplasmose','Rubéole','β-HCG','TSH','T3 / T4','PSA'] },
  { id: 'urinaire', label: '5. Biochimie urinaire', color: '#d97706', textColor: '#92400e', tube: '', subGroups: [{ label: 'Bandelette urinaire', analyses: ['Leucocytes','Nitrites','Protéines','Glucose','Sang / Hématies','pH urinaire','ECBU (Culot urinaire)','Protéinurie 24h'] }] },
  { id: 'parasito', label: '6. Parasitologie / Microbiologie', color: '#16a34a', textColor: '#14532d', tube: '', analyses: ['TDR Paludisme','GE / Frottis (GE/FM)','Examen parasitologique selles','Recherche sang occulte','Recherche microfilaires'] },
  { id: 'liquide', label: '7. Liquide de ponction', color: '#0891b2', textColor: '#164e63', tube: '', subGroups: [
    { label: 'Nature du liquide', analyses: ['LCR','Liquide d\'ascite','Liquide pleural','Liquide péricardique','Autre ponction'] },
    { label: 'Analyses sur liquide', analyses: ['Biochimie (protéines, glucose)','Cytologie','Bactériologie / Culture'] },
  ]},
];

export default function LaboForm() {
  const [urgence, setUrgence] = useState('n');
  const [alertes, setAlertes] = useState('');
  const [renseignements, setRenseignements] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');

  const urgenceStyle = {
    n:  { border: '#bbf7d0', bg: 'var(--inp)', dot: '#16a34a' },
    u:  { border: '#fde68a', bg: '#fffbeb', dot: '#d97706' },
    tu: { border: '#fca5a5', bg: '#fef2f2', dot: '#dc2626' },
  }[urgence] ?? { border: '#bbf7d0', bg: 'var(--inp)', dot: '#16a34a' };

  function toggle(val: string) { setSelected(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]); }
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2800); }
  const isFormValid = selected.length > 0 && renseignements.trim();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignItems: 'start' }}>

      {/* COLONNE GAUCHE */}
      <div>
        {/* Renseignements cliniques */}
        <div className="card mb12">
          <label className="lbl">Renseignements cliniques <span className="req">*</span></label>
          <textarea rows={2} placeholder="Motif, antécédents, suspicion diagnostique..."
            value={renseignements} onChange={e => setRenseignements(e.target.value)} />
        </div>

        {/* Analyses par catégorie */}
        {CATEGORIES.map(cat => (
          <div key={cat.id} className="card mb12">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: cat.color, flexShrink: 0 }}></div>
              <span style={{ fontSize: 13, fontWeight: 700, color: cat.textColor }}>
                {cat.label}{cat.tube && ` (${cat.tube})`}
              </span>
            </div>
            {cat.subGroups ? cat.subGroups.map(sg => (
              <div key={sg.label} style={{ marginBottom: 10 }}>
                <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--txt2)', marginBottom: 6 }}>{sg.label}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  {sg.analyses.map(a => (
                    <label key={a} className="cr" style={{ cursor: 'pointer' }}>
                      <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--txt2)' }}>{a}</span>
                      <input type="checkbox" checked={selected.includes(a)} onChange={() => toggle(a)}
                        style={{ accentColor: 'var(--navy)', width: 16, height: 16, flexShrink: 0 }} />
                    </label>
                  ))}
                </div>
              </div>
            )) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {cat.analyses!.map(a => (
                  <label key={a} className="cr" style={{ cursor: 'pointer' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--txt2)' }}>{a}</span>
                    <input type="checkbox" checked={selected.includes(a)} onChange={() => toggle(a)}
                      style={{ accentColor: 'var(--navy)', width: 16, height: 16, flexShrink: 0 }} />
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Notes */}
        <div className="card mb12">
          <label className="lbl">Notes complémentaires</label>
          <textarea rows={2} placeholder="Ex : patient à jeun, dernier repas à 8h..."
            value={notes} onChange={e => setNotes(e.target.value)} />
        </div>
      </div>

      {/* COLONNE DROITE — sticky */}
      <div style={{ position: 'sticky', top: 16 }}>
        {/* Urgence + Alertes */}
        <div className="card mb12" style={{ padding: 10 }}>
          <label className="lbl">Degré d'urgence <span className="req">*</span></label>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
            borderRadius: 10, background: urgenceStyle.bg,
            border: `1.5px solid ${urgenceStyle.border}`, marginBottom: 10
          }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: urgenceStyle.dot, flexShrink: 0 }}></div>
            <select value={urgence} onChange={e => setUrgence(e.target.value)}
              style={{ flex: 1, background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--txt)', cursor: 'pointer', outline: 'none', fontFamily: 'inherit' }}>
              <option value="n">Normal</option>
              <option value="u">Urgent</option>
              <option value="tu">STAT</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span className="ms" style={{ fontSize: 15, color: 'var(--red)' }}>warning</span>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: 'var(--red)' }}>Précautions &amp; Alertes</span>
          </div>
          <textarea
            style={{ background: 'var(--red-lt)', border: '1.5px dashed var(--red-bdr)', borderRadius: 10, padding: '8px 12px', fontSize: 13, color: 'var(--txt)', outline: 'none', width: '100%', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }}
            rows={2} placeholder="Allergies, contre-indications..."
            value={alertes} onChange={e => setAlertes(e.target.value)} />
        </div>

        {/* Récapitulatif sélection */}
        <div className="card mb12" style={{ padding: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span className="ms" style={{ fontSize: 15, color: 'var(--navy)' }}>science</span>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.8px', color: 'var(--navy)' }}>
              {selected.length > 0 ? `${selected.length} analyse${selected.length > 1 ? 's' : ''} sélectionnée${selected.length > 1 ? 's' : ''}` : 'Aucune sélection'}
            </span>
          </div>
          {selected.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {selected.map(a => (
                <span key={a} onClick={() => toggle(a)} style={{
                  background: '#fff', border: '1px solid var(--navy-mid)', borderRadius: 20,
                  padding: '2px 8px', fontSize: 11, fontWeight: 600, color: 'var(--navy)',
                  display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer'
                }}>
                  {a}<span className="ms" style={{ fontSize: 12 }}>close</span>
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic' }}>Cochez les analyses souhaitées</p>
          )}
        </div>

        {/* Bouton valider */}
        <button className="bp" onClick={() => setShowModal(true)}
          style={{ opacity: isFormValid ? 1 : 0.5, pointerEvents: isFormValid ? 'auto' : 'none', width: '100%' }}>
          <span className="ms">check_circle</span>Valider
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="mb op" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="mbox">
            <h3>Valider — Laboratoire</h3>
            <p>{selected.length} analyse{selected.length > 1 ? 's' : ''} sélectionnée{selected.length > 1 ? 's' : ''}. La prescription sera transmise au laboratoire.</p>
            <div className="mbtns">
              <button className="bca" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="bok" onClick={() => { setShowModal(false); showToast('Prescription transmise au laboratoire'); }}>Confirmer</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="tst on"><span className="ms">check_circle</span>{toast}</div>}
    </div>
  );
}

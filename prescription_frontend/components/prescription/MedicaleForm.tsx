"use client";

import { useState, useRef, useEffect } from 'react';

interface Medicament {
  id: string;
  nom: string;
  dose: string;
  quantite: number;
  voie: string;
  frequence: string;
  duree: string;
  dateDebut: string;
  heureDebut: string;
  instructions: string;
  remarques: string;
}

const STOCK_MEDICAMENTS = [
  "Paracétamol 500 mg", "Paracétamol 1 g", "Amoxicilline 500 mg", "Amoxicilline 1 g",
  "Ciprofloxacine 500 mg", "Métronidazole 500 mg", "Oméprazole 20 mg", "Furosémide 40 mg",
  "Metformine 500 mg", "Insuline glargine", "Salbutamol inhalateur", "Prednisone 20 mg",
  "Ibuprofène 400 mg", "Tramadol 50 mg", "Ceftriaxone 1 g",
];

export default function MedicaleForm() {
  const [medicaments, setMedicaments] = useState<Medicament[]>([]);
  const [nom, setNom] = useState('');
  const [dose, setDose] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [voie, setVoie] = useState('');
  const [frequence, setFrequence] = useState('');
  const [duree, setDuree] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [instructions, setInstructions] = useState('');
  const [remarques, setRemarques] = useState('');
  const [notifier, setNotifier] = useState(false);
  const [showOrdModal, setShowOrdModal] = useState(false);
  const [showValidModal, setShowValidModal] = useState(false);
  const [remarqueGenerale, setRemarqueGenerale] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isFormValid = nom.trim() && dose.trim() && frequence && duree.trim();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    setNom(value);
    if (value.trim().length > 0) {
      const filtered = STOCK_MEDICAMENTS.filter(med => med.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (med: string) => { setNom(med); setShowSuggestions(false); };

  const ajouterMedicament = () => {
    if (!isFormValid) return;
    setMedicaments([...medicaments, {
      id: Date.now().toString(),
      nom, dose, quantite, voie, frequence, duree, dateDebut, heureDebut, instructions, remarques
    }]);
    setNom(''); setDose(''); setQuantite(1); setVoie(''); setFrequence('');
    setDuree(''); setDateDebut(''); setHeureDebut(''); setInstructions(''); setRemarques('');
    setShowSuggestions(false);
  };

  const supprimerMedicament = (id: string) => { setMedicaments(medicaments.filter(m => m.id !== id)); };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignItems: 'start' }}>

      {/* COLONNE GAUCHE */}
      <div>
        {/* Formulaire ajout médicament */}
        <div className="card mb12" style={{ padding: 12 }}>
          <div className="mb12" ref={wrapperRef} style={{ position: 'relative' }}>
            <label className="lbl">Médicament <span className="req">*</span></label>
            <div className="iw">
              <input type="text" value={nom} onChange={e => handleSearchChange(e.target.value)}
                onFocus={() => { if (nom.trim().length > 0) setShowSuggestions(true); }}
                placeholder="Rechercher dans le stock pharmacie..." />
              <span className="ico"><span className="ms">search</span></span>
            </div>
            {showSuggestions && suggestions.length > 0 && (
              <ul style={{ position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 2, background: 'var(--card)', border: '1px solid var(--bdr)', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 30, maxHeight: 200, overflowY: 'auto', listStyle: 'none', padding: 0, margin: 0 }}>
                {suggestions.map((s, idx) => (
                  <li key={idx} onMouseDown={() => selectSuggestion(s)}
                    style={{ padding: '8px 12px', cursor: 'pointer', fontSize: 13, borderBottom: '1px solid var(--bdr)', color: 'var(--txt)' }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--navy-lt)')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >{s}</li>
                ))}
              </ul>
            )}
            <p className="hint">Le médicament est recherché dans le stock en détail de la pharmacie.</p>
          </div>
          <div className="g2 mb12">
            <div><label className="lbl">Dose <span className="req">*</span></label><input type="text" value={dose} onChange={e => setDose(e.target.value)} placeholder="Ex : 1g, 500mg"/></div>
            <div><label className="lbl">Quantité</label><input type="number" min={1} value={quantite} onChange={e => setQuantite(Math.max(1, parseInt(e.target.value) || 1))} /></div>
          </div>
          <div className="mb12"><label className="lbl">Voie d'administration</label><select value={voie} onChange={e => setVoie(e.target.value)}><option value="">Sélectionner</option><option>Orale (per os)</option><option>Intraveineuse (IV)</option><option>Intramusculaire (IM)</option><option>Sous-cutanée (SC)</option><option>Rectale</option><option>Topique / locale</option><option>Inhalation</option><option>Sublinguale</option></select></div>
          <div className="g2 mb12">
            <div><label className="lbl">Fréquence <span className="req">*</span></label><select value={frequence} onChange={e => setFrequence(e.target.value)}><option value="">Sélectionner</option><option>1× par jour</option><option>2× par jour (toutes les 12h)</option><option>3× par jour (toutes les 8h)</option><option>4× par jour (toutes les 6h)</option><option>Toutes les 4h</option><option>En continu (perfusion)</option><option>Si besoin (SOS)</option><option>Dose unique</option></select></div>
            <div><label className="lbl">Durée <span className="req">*</span></label><input type="text" value={duree} onChange={e => setDuree(e.target.value)} placeholder="Ex : 7 jours, 1 mois"/></div>
          </div>
          <div className="g2 mb12">
            <div><label className="lbl">Date de début</label><input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)}/></div>
            <div><label className="lbl">Heure de début</label><input type="time" value={heureDebut} onChange={e => setHeureDebut(e.target.value)}/></div>
          </div>
          <div className="mb12"><label className="lbl">Instructions d'utilisation</label><input type="text" value={instructions} onChange={e => setInstructions(e.target.value)} placeholder="Ex : à prendre après les repas..."/></div>
          <div className="mb12"><label className="lbl">Remarques</label><input type="text" value={remarques} onChange={e => setRemarques(e.target.value)} placeholder="Précisions complémentaires..."/></div>
          <button className="badd" onClick={ajouterMedicament} style={{ opacity: isFormValid ? 1 : 0.5 }}>
            <span className="ms" style={{fontSize:17}}>add</span> Ajouter à la prescription
          </button>
        </div>

        {/* Liste des médicaments */}
        <div className="sh mb12">
          Prescriptions ajoutées{' '}
          <span style={{background:'var(--navy)',color:'#fff',borderRadius:'10px',padding:'1px 7px',fontSize:'10px',marginLeft:'5px'}}>{medicaments.length}</span>
        </div>
        <div className="mb12">
          {medicaments.length === 0 ? (
            <div style={{textAlign:'center',padding:'20px',color:'var(--txt3)',fontSize:'13px'}}>Aucune prescription médicamenteuse ajoutée</div>
          ) : medicaments.map(m => (
            <div key={m.id} className="rxi">
              <div className="rxi-ic"><span className="ms">medication</span></div>
              <div className="rxi-m">
                <h4>{m.nom} {m.dose} — qté : {m.quantite}</h4>
                <p>{m.frequence} · {m.duree} {m.voie && `· ${m.voie}`}</p>
                {(m.dateDebut || m.heureDebut) && <p style={{fontSize:11,color:'var(--txt3)',marginTop:3}}>{m.dateDebut && `Début : ${m.dateDebut}`}{m.heureDebut && ` à ${m.heureDebut}`}</p>}
                {m.instructions && <p style={{fontSize:11,color:'var(--txt3)',marginTop:2}}>{m.instructions}</p>}
              </div>
              <button className="bdel" onClick={() => supprimerMedicament(m.id)}><span className="ms">delete</span></button>
            </div>
          ))}
        </div>
      </div>

      {/* COLONNE DROITE — sticky */}
      <div style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Prescriptions en cours */}
        <div className="active-rx">
          <div className="active-rx-header"><span className="ms">pending_actions</span><span>Prescriptions en cours</span></div>
          <div className="active-rx-item"><strong>Furosémide 40 mg</strong><span> — 1 cp matin · Dr RAZAFY</span></div>
          <div className="active-rx-item"><strong>Metformine 500 mg</strong><span> — 1 cp matin et soir · Dr ANDRIAMANA</span></div>
        </div>

        {/* Remarques générales */}
        <div className="card" style={{ padding: 12 }}>
          <label className="lbl">Remarques générales</label>
          <textarea rows={3} placeholder="Notes complémentaires..." value={remarqueGenerale} onChange={e => setRemarqueGenerale(e.target.value)}></textarea>
        </div>

        {/* Notifier infirmiers */}
        <div className="card" style={{ padding: 12 }}>
          <div className="togr">
            <div className="togr-l"><p>Notifier les infirmiers</p><span>Envoyer une notification au service</span></div>
            <label className="tog"><input type="checkbox" checked={notifier} onChange={e => setNotifier(e.target.checked)}/><span className="tog-t"></span></label>
          </div>
          {notifier && <div className="hint"><span className="ms" style={{fontSize:13,verticalAlign:'middle',color:'var(--navy)'}}>notifications_active</span> Notification envoyée aux <strong>infirmiers de garde</strong>.</div>}
        </div>

        {/* Bouton valider */}
        <button className="bp" onClick={() => setShowOrdModal(true)}
          style={{ opacity: isFormValid ? 1 : 0.5, pointerEvents: isFormValid ? "auto" : "none" }}>
          <span className="ms">check_circle</span>Valider
        </button>
      </div>

      {/* Modal */}
      {showOrdModal && (
        <div className="mb op" onClick={e => { if (e.target === e.currentTarget) setShowOrdModal(false); }}>
          <div className="mbox">
            <h3>Prescription validée</h3>
            <p>Souhaitez-vous créer une ordonnance pour la pharmacie ?</p>
            <div className="mbtns">
              <button className="bca" onClick={() => { setShowOrdModal(false); setShowValidModal(true); }}>Non, merci</button>
              <button className="bok" onClick={() => { setShowOrdModal(false); setShowValidModal(true); }}><span className="ms" style={{fontSize:'16px'}}>description</span> Créer une ordonnance</button>
            </div>
          </div>
        </div>
      )}
      {showValidModal && <div className="tst on"><span className="ms">check_circle</span>Prescription médicamenteuse validée</div>}
    </div>
  );
}

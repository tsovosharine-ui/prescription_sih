'use client';

import { useState } from 'react';

interface NMItem {
  id: string;
  type: string;
  typeLabel: string;
  description: string;
  duree: string;
  frequence: string;
  dateDebut: string;
  heureDebut: string;
  instructions: string;
}

const TYPE_OPTIONS = [
  { value: 'regime', label: 'Régime alimentaire' },
  { value: 'mobilisation', label: 'Mobilisation / Positionnement' },
  { value: 'nursing', label: 'Soins infirmiers / Nursing' },
  { value: 'hygiene', label: 'Hygiène' },
  { value: 'contention', label: 'Contention / Attelle' },
  { value: 'autre', label: 'Autre' },
];

const TYPE_ICON: Record<string, string> = {
  regime: 'restaurant', mobilisation: 'accessibility_new', nursing: 'health_and_safety',
  hygiene: 'soap', contention: 'back_hand', autre: 'more_horiz',
};

export default function NonMedicaleForm() {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [duree, setDuree] = useState('');
  const [frequence, setFrequence] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [heureDebut, setHeureDebut] = useState('');
  const [instructions, setInstructions] = useState('');
  const [items, setItems] = useState<NMItem[]>([]);
  const [notifOn, setNotifOn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState('');

  const isFormValid = type && description.trim();

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 2800); }

  function handleAdd() {
    if (!isFormValid) return;
    const typeLabel = TYPE_OPTIONS.find(o => o.value === type)?.label ?? type;
    setItems(prev => [...prev, {
      id: Date.now().toString(), type, typeLabel,
      description: description.trim(), duree: duree.trim(), frequence: frequence.trim(),
      dateDebut, heureDebut, instructions: instructions.trim(),
    }]);
    setType(''); setDescription(''); setDuree(''); setFrequence('');
    setDateDebut(''); setHeureDebut(''); setInstructions('');
  }

  function handleDelete(id: string) { setItems(prev => prev.filter(i => i.id !== id)); }
  function handleValidate() { setShowModal(false); showToast('Prescription non médicamenteuse validée'); }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignItems: 'start' }}>

      {/* COLONNE GAUCHE */}
      <div>
        <div className="info-note mb12">
          <span className="ms">info</span>
          <span>Prescription non médicamenteuse : régimes, mobilisation, nursing, hygiène...</span>
        </div>

        <div className="card mb12" style={{ padding: 12 }}>
          <div className="mb12">
            <label className="lbl">Type de prescription <span className="req">*</span></label>
            <select value={type} onChange={e => setType(e.target.value)}>
              <option value="">Sélectionner un type</option>
              {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="mb12">
            <label className="lbl">Description précise <span className="req">*</span></label>
            <input type="text" placeholder="Ex : Régime sans sel strict..." value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div className="g2 mb12">
            <div><label className="lbl">Durée / Période</label><input type="text" placeholder="Ex : 2 semaines..." value={duree} onChange={e => setDuree(e.target.value)} /></div>
            <div><label className="lbl">Fréquence</label><input type="text" placeholder="Ex : 2× par jour..." value={frequence} onChange={e => setFrequence(e.target.value)} /></div>
          </div>
          <div className="g2 mb12">
            <div><label className="lbl">Date de début</label><input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} /></div>
            <div><label className="lbl">Heure de début</label><input type="time" value={heureDebut} onChange={e => setHeureDebut(e.target.value)} /></div>
          </div>
          <button className="badd" onClick={handleAdd} style={{ opacity: isFormValid ? 1 : 0.5 }}>
            <span className="ms" style={{ fontSize: 17 }}>add</span> Ajouter
          </button>
        </div>

        {/* Liste */}
        <div className="sh mb12">Prescriptions non médicamenteuses</div>
        <div className="mb12">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 20, color: 'var(--txt3)', fontSize: 13 }}>Aucune prescription ajoutée</div>
          ) : items.map(item => (
            <div key={item.id} className="rxi">
              <div className="rxi-ic"><span className="ms">{TYPE_ICON[item.type] ?? 'self_care'}</span></div>
              <div className="rxi-m">
                <h4>{item.typeLabel}</h4><p>{item.description}</p>
                {(item.duree || item.frequence) && <p style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 3 }}>{[item.duree, item.frequence].filter(Boolean).join(' · ')}</p>}
                {(item.dateDebut || item.heureDebut) && <p style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{item.dateDebut && `Début : ${item.dateDebut}`}{item.heureDebut && ` à ${item.heureDebut}`}</p>}
                {item.instructions && <p style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{item.instructions}</p>}
              </div>
              <button className="bdel" onClick={() => handleDelete(item.id)}><span className="ms">delete</span></button>
            </div>
          ))}
        </div>
      </div>

      {/* COLONNE DROITE — sticky */}
      <div style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Instructions */}
        <div className="card" style={{ padding: 12 }}>
          <label className="lbl">Instructions pour l'équipe soignante</label>
          <textarea rows={4} placeholder="Précisions pour l'équipe..." value={instructions} onChange={e => setInstructions(e.target.value)} />
        </div>

        {/* Notifier */}
        <div className="card" style={{ padding: 12 }}>
          <div className="togr">
            <div className="togr-l"><p>Notifier les infirmiers</p><span>Envoyer une notification au service</span></div>
            <label className="tog"><input type="checkbox" checked={notifOn} onChange={e => setNotifOn(e.target.checked)}/><span className="tog-t"></span></label>
          </div>
          {notifOn && <div className="hint"><span className="ms" style={{ fontSize: 13, verticalAlign: 'middle', color: 'var(--navy)' }}>notifications_active</span> Notification envoyée aux infirmiers de garde.</div>}
        </div>

        {/* Bouton valider */}
        <button className="bp" onClick={() => setShowModal(true)}
          style={{ opacity: isFormValid ? 1 : 0.5, pointerEvents: isFormValid ? "auto" : "none" }}>
          <span className="ms">check_circle</span>Valider
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="mb op" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="mbox">
            <h3>Valider — Non Médicamenteuse</h3>
            <p>La prescription sera validée et transmise.</p>
            <div className="mbtns">
              <button className="bca" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="bok" onClick={handleValidate}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="tst on"><span className="ms">check_circle</span>{toast}</div>}
    </div>
  );
}

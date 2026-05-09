"use client";
import { useState } from "react";

type Urgence = "n" | "u" | "tu";
const urgenceClasses: Record<Urgence, string> = { n: "un", u: "uu", tu: "utu" };

const KINE_TYPES = [
  "Kinésithérapie respiratoire", "Mobilisation passive", "Mobilisation active",
  "Renforcement musculaire", "Équilibre / Prévention des chutes",
  "Rééducation à la marche", "Massage thérapeutique", "Drainage lymphatique",
  "Hydrothérapie", "Autre",
];

const CONTRE_INDICATIONS = [
  "Pas de massage (anticoagulants, thrombose)",
  "Pas de chaleur (infection active)",
  "Pas de mobilisation active (fracture non consolidée)",
  "Pas d'hydrothérapie (plaie ouverte)",
  "Appui interdit",
];

export default function KineForm() {
  const [urgence, setUrgence]       = useState<Urgence>("n");
  const [alertes, setAlertes]       = useState("");
  const [renseign, setRenseign]     = useState("");
  const [kineType, setKineType]     = useState("");
  const [kineAutre, setKineAutre]   = useState("");
  const [diagnostic, setDiagnostic] = useState("");
  const [ciSelected, setCiSelected] = useState<string[]>([]);
  const [ciAutre, setCiAutre]       = useState(false);
  const [ciAutreText, setCiAutreText] = useState("");
  const [objectifs, setObjectifs]   = useState("");
  const [remarques, setRemarques]   = useState("");
  const [showModal, setShowModal]   = useState(false);
  const [toast, setToast]           = useState("");

  function toggleCI(val: string) {
    setCiSelected(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }

  const isFormValid = !!renseign.trim() && !!kineType &&
    (kineType !== "Autre" || !!kineAutre.trim()) && !!diagnostic.trim() && !!objectifs.trim();

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2800); }
  function handleSubmit() { setShowModal(false); showToast("Prescription kinésithérapie transmise"); }

  return (
    <div>
      <div className="info-note mb12">
        <span className="ms">info</span>
        <span>Le kinésithérapeute est un service à part : il reçoit la prescription et organise ses séances selon son planning propre.</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignItems: 'start' }}>
        {/* COLONNE GAUCHE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 12 }}>
            <label className="lbl">Renseignements cliniques <span className="req">*</span></label>
            <textarea rows={3} value={renseign} onChange={e => setRenseign(e.target.value)} placeholder="Contexte clinique, résultats d'imagerie, données pertinentes..." />
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="mb12">
              <label className="lbl">Type de kinésithérapie prescrite <span className="req">*</span></label>
              <select value={kineType} onChange={e => setKineType(e.target.value)}>
                <option value="">— Sélectionner —</option>
                {KINE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {kineType === "Autre" && (
              <div className="mb12">
                <label className="lbl">Préciser le type <span className="req">*</span></label>
                <input type="text" value={kineAutre} onChange={e => setKineAutre(e.target.value)} placeholder="Décrire le type de kinésithérapie..." />
              </div>
            )}
            <div className="mb12">
              <label className="lbl">Diagnostic / Indication principale <span className="req">*</span></label>
              <input type="text" value={diagnostic} onChange={e => setDiagnostic(e.target.value)} placeholder="Ex : fracture col fémoral, AVC hémiplégique droit, BPCO, entorse cheville..." />
            </div>
            <div className="mb12">
              <label className="lbl">Contre-indications à certaines techniques</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 8 }}>
                {CONTRE_INDICATIONS.map(ci => (
                  <label key={ci} className="cr">
                    <span>{ci}</span>
                    <input type="checkbox" checked={ciSelected.includes(ci)} onChange={() => toggleCI(ci)} style={{ accentColor: "var(--navy)" }} />
                  </label>
                ))}
                <label className="cr">
                  <span>Autre contre-indication</span>
                  <input type="checkbox" checked={ciAutre} onChange={e => setCiAutre(e.target.checked)} style={{ accentColor: "var(--navy)" }} />
                </label>
              </div>
              {ciAutre && (
                <input type="text" value={ciAutreText} onChange={e => setCiAutreText(e.target.value)} placeholder="Préciser la contre-indication..." />
              )}
            </div>
          </div>
        </div>

        {/* COLONNE DROITE — sticky */}
        <div style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 8 }}>
            <label className="lbl">Degré d'urgence <span className="req">*</span></label>
            <div className={`urgr ${urgenceClasses[urgence]}`} style={{ marginBottom: 8 }}>
              <div className="urgd" />
              <select className="urgs" value={urgence} onChange={e => setUrgence(e.target.value as Urgence)}>
                <option value="n">Normal</option>
                <option value="u">Urgent</option>
                <option value="tu">STAT</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span className="ms" style={{ fontSize: 16, color: "var(--red)" }}>warning</span>
              <span className="lbl" style={{ margin: 0 }}>Précautions &amp; Alertes</span>
            </div>
            <textarea rows={1} value={alertes} onChange={e => setAlertes(e.target.value)}
              placeholder="Contre-indications, allergies, fractures non consolidées, anticoagulants..."
              style={{ background: "var(--red-lt)", border: "1.5px solid var(--red-bdr)", padding: '8px 12px' }} />
          </div>
          <div className="card" style={{ padding: 12 }}>
            <label className="lbl">Objectifs thérapeutiques <span className="req">*</span></label>
            <textarea rows={3} value={objectifs} onChange={e => setObjectifs(e.target.value)} placeholder="Ex : récupération de la mobilité articulaire, renforcement musculaire, amélioration de la marche..." />
          </div>
          <div className="card" style={{ padding: 12 }}>
            <label className="lbl">Remarques complémentaires</label>
            <textarea rows={2} value={remarques} onChange={e => setRemarques(e.target.value)} placeholder="Informations supplémentaires pour le kinésithérapeute..." />
          </div>
          <button className="bp" onClick={() => setShowModal(true)}
            style={{ opacity: isFormValid ? 1 : 0.5, pointerEvents: isFormValid ? "auto" : "none", marginTop: 0 }}>
            <span className="ms">check_circle</span>Valider la prescription
          </button>
        </div>
      </div>

      {showModal && (
        <div className="mb op" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="mbox">
            <h3>Confirmer la demande ?</h3>
            <p>La prescription sera transmise au service de kinésithérapie.</p>
            <div className="mbtns">
              <button className="bca" onClick={() => setShowModal(false)}>Annuler</button>
              <button className="bok" onClick={handleSubmit}>Confirmer</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="tst on"><span className="ms">check_circle</span>{toast}</div>}
    </div>
  );
}

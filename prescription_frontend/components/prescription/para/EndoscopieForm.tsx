"use client";
import { useState } from "react";

type Urgence = "n" | "u" | "tu";
const urgenceClasses: Record<Urgence, string> = { n: "un", u: "uu", tu: "utu" };

const TYPES_ENDO = [
  "Fibroscopie digestive haute (FOGD)",
  "Coloscopie",
  "Recto-sigmoïdoscopie",
  "Ligature de varices œsophagiennes",
  "Dilatation pneumatique",
  "GPE (Gastrostomie percutanée endoscopique)",
];

export default function EndoscopieForm() {
  const [urgence, setUrgence] = useState<Urgence>("n");
  const [alertes, setAlertes] = useState("");
  const [renseignements, setRenseignements] = useState("");
  const [typeExamen, setTypeExamen] = useState("");
  const [typeAutre, setTypeAutre] = useState("");
  const [remarques, setRemarques] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState("");

  const typeEffectif = typeExamen === "Autre" ? typeAutre.trim() : typeExamen;
  const isFormValid = renseignements.trim() !== "" && typeEffectif !== "";

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2800); }
  function handleSubmit() { setShowModal(false); showToast("Prescription endoscopie envoyée"); }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignItems: 'start' }}>
        {/* COLONNE GAUCHE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 12 }}>
            <label className="lbl">Renseignements cliniques <span className="req">*</span></label>
            <textarea rows={3} value={renseignements} onChange={e => setRenseignements(e.target.value)}
              placeholder="Motif, symptômes, suspicion diagnostique, antécédents digestifs..." />
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="mb12">
              <label className="lbl">Type d'examen endoscopique <span className="req">*</span></label>
              <div className="rg">
                {TYPES_ENDO.map(t => (
                  <label className="rc" key={t}>
                    <input type="radio" name="endo-type" value={t} checked={typeExamen === t} onChange={() => setTypeExamen(t)} />
                    <span>{t}</span>
                  </label>
                ))}
                <label className="rc">
                  <input type="radio" name="endo-type" value="Autre" checked={typeExamen === "Autre"} onChange={() => setTypeExamen("Autre")} />
                  <span>Autre</span>
                </label>
              </div>
              {typeExamen === "Autre" && (
                <input type="text" style={{ marginTop: 8 }} placeholder="Précisez le type d'examen..." value={typeAutre} onChange={e => setTypeAutre(e.target.value)} />
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
            <div className="ah"><span className="ms">warning</span><span>Précautions &amp; Alertes</span></div>
            <textarea className="af" rows={1} value={alertes} onChange={e => setAlertes(e.target.value)}
              placeholder="Allergies anesthésiques, anticoagulants, troubles de la coagulation..."
              style={{ padding: '8px 12px' }} />
          </div>
          <div className="card" style={{ padding: 12 }}>
            <label className="lbl">Remarques complémentaires</label>
            <textarea rows={2} value={remarques} onChange={e => setRemarques(e.target.value)}
              placeholder="Informations supplémentaires pour l'équipe d'endoscopie..." />
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
            <h3>Confirmer la prescription ?</h3>
            <p>La prescription d'endoscopie sera transmise à l'équipe concernée.</p>
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

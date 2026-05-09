"use client";
import { useState } from "react";

type Urgence = "n" | "u" | "tu";
const urgenceClasses: Record<Urgence, string> = { n: "un", u: "uu", tu: "utu" };

const DIALYSE_TYPES = [
  "HD conventionnelle (Hémodialyse)",
  "HDF on-line (Hémodiafiltration)",
  "Hémofiltration (HF)",
  "DPCA (Dialyse péritonéale continue ambulatoire)",
  "DPA automatisée",
];

export default function DiaryseForm() {
  const [urgence, setUrgence]     = useState<Urgence>("n");
  const [alertes, setAlertes]     = useState("");
  const [renseign, setRenseign]   = useState("");
  const [dialType, setDialType]   = useState("");
  const [remarques, setRemarques] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast]         = useState("");

  const isFormValid = !!renseign.trim() && !!dialType;

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2800); }
  function handleSubmit() { setShowModal(false); showToast("Prescription dialyse transmise"); }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignItems: 'start' }}>
        {/* COLONNE GAUCHE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 12 }}>
            <label className="lbl">Renseignements cliniques <span className="req">*</span></label>
            <textarea rows={3} value={renseign} onChange={e => setRenseign(e.target.value)}
              placeholder="Insuffisance rénale, indications de dialyse, antécédents néphrologiques..." />
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="mb12">
              <label className="lbl">Type de dialyse <span className="req">*</span></label>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
                {DIALYSE_TYPES.map(t => (
                  <label key={t} className="rc">
                    <input type="radio" name="dial-type" checked={dialType === t} onChange={() => setDialType(t)}
                      style={{ accentColor: "var(--navy)" }} />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
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
              placeholder="Accès vasculaire, anticoagulation, allergies..."
              style={{ background: "var(--red-lt)", border: "1.5px solid var(--red-bdr)", padding: '8px 12px' }} />
          </div>
          <div className="card" style={{ padding: 12 }}>
            <label className="lbl">Autres remarques</label>
            <textarea rows={3} value={remarques} onChange={e => setRemarques(e.target.value)}
              placeholder="Durée de séance, débit, héparine, objectif poids sec, médecin référent..." />
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
            <p>La prescription sera transmise au service de dialyse.</p>
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

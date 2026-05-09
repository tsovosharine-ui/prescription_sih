"use client";
import { useState } from "react";

type Urgence = "n" | "u" | "tu";
const urgenceClasses: Record<Urgence, string> = { n: "un", u: "uu", tu: "utu" };

export default function BlocForm() {
  const [urgence, setUrgence]       = useState<Urgence>("n");
  const [alertes, setAlertes]       = useState("");
  const [renseignements, setRenseignements] = useState("");
  const [libelle, setLibelle]       = useState("");
  const [dateIntervention, setDateIntervention] = useState("");
  const [risqueHemo, setRisqueHemo] = useState("");
  const [typeChir, setTypeChir]     = useState("");
  const [consignes, setConsignes]   = useState("");
  const [chirurgien, setChirurgien] = useState("");
  const [showModal, setShowModal]   = useState(false);
  const [toast, setToast]           = useState("");

  const isFormValid = libelle.trim() !== "" && renseignements.trim() !== "";

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2800); }
  function handleSubmit() { setShowModal(false); showToast("Prescription bloc envoyée — Demande de CPA transmise"); }

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16, alignItems: 'start' }}>
        {/* COLONNE GAUCHE */}
        <div className="card" style={{ padding: 12 }}>
          <div className="mb12">
            <label className="lbl">Renseignements cliniques <span className="req">*</span></label>
            <textarea rows={3} placeholder="Contexte clinique, motif de l'intervention..." value={renseignements} onChange={e => setRenseignements(e.target.value)} />
          </div>
          <div className="mb12">
            <label className="lbl">Libellé de l'intervention chirurgicale <span className="req">*</span></label>
            <textarea rows={3} placeholder="Décrire précisément l'acte opératoire à réaliser..." value={libelle} onChange={e => setLibelle(e.target.value)} />
          </div>
          <div className="mb12">
            <label className="lbl">Date souhaitée pour l'intervention</label>
            <input type="date" value={dateIntervention} onChange={e => setDateIntervention(e.target.value)} />
          </div>
          <div className="mb12">
            <label className="lbl">Risque hémorragique estimé</label>
            <div className="g3">
              {["Faible", "Modéré", "Élevé"].map(v => (
                <label key={v} className="rc">
                  <input type="radio" name="bloc-hemo" checked={risqueHemo === v} onChange={() => setRisqueHemo(v)} style={{ accentColor: "var(--navy)" }} />
                  <span>{v}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb12">
            <label className="lbl">Type de chirurgie</label>
            <input type="text" value={typeChir} onChange={e => setTypeChir(e.target.value)} placeholder="Ex : chirurgie viscérale, orthopédique..." />
          </div>
          <label className="lbl">Consignes particulières / Matériel spécifique</label>
          <textarea rows={3} value={consignes} onChange={e => setConsignes(e.target.value)} placeholder="Ex : nécessité d'un implant, prothèse..." />
        </div>

        {/* COLONNE DROITE — sticky */}
        <div style={{ position: 'sticky', top: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="card" style={{ padding: 8 }}>
            <label className="lbl">Degré d'urgence <span className="req">*</span></label>
            <div className={`urgr ${urgenceClasses[urgence]}`} style={{ marginBottom: 8 }}>
              <div className="urgd" />
              <select className="urgs" value={urgence} onChange={e => setUrgence(e.target.value as Urgence)}>
                <option value="n">Normal (programmé)</option>
                <option value="u">Urgent</option>
                <option value="tu">STAT — Urgence vitale (CPA différé)</option>
              </select>
            </div>
            <div className="ah"><span className="ms">warning</span><span>Précautions &amp; Alertes</span></div>
            <textarea
              className="af" rows={2}
              placeholder="Allergies connues, anticoagulants, implants, antécédents chirurgicaux importants..."
              value={alertes} onChange={e => setAlertes(e.target.value)}
              style={alertes.trim() ? { background: "var(--red-lt)", border: "1.5px solid var(--red-bdr)", padding: '8px 12px' } : { padding: '8px 12px' }}
            />
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="sh mb12">Chirurgien prescripteur</div>
            <div className="mb12">
              <label className="lbl">Nom du chirurgien prescripteur</label>
              <input type="text" value={chirurgien} onChange={e => setChirurgien(e.target.value)} placeholder="Dr. ________________" />
            </div>
            <div className="info-note" style={{ marginBottom: 0 }}>
              <span className="ms">info</span>
              <span>La signature numérique sera apposée par le <strong>Professeur anesthésiste lors du CPA</strong>.</span>
            </div>
          </div>
          <button className="bp" onClick={() => setShowModal(true)}
            style={{ opacity: isFormValid ? 1 : 0.5, pointerEvents: isFormValid ? "auto" : "none", marginTop: 0 }}>
            <span className="ms">medical_services</span>Valider — Envoyer demande de CPA
          </button>
        </div>
      </div>

      <p className="hint" style={{ textAlign: "center", marginTop: 6 }}>
        Cette validation transmet automatiquement une demande de CPA au Professeur anesthésiste
      </p>

      {showModal && (
        <div className="mb op" onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div className="mbox">
            <h3>Confirmer la prescription ?</h3>
            <p>La prescription bloc opératoire sera transmise et une demande de CPA envoyée automatiquement au Professeur anesthésiste.</p>
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

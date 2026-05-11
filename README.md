# prescription_sih
```bash
cat > ~/Documents/prescription/README.md << 'EOF'
# 🏥 Module Prescription — CHU Andrainjato

Application web de gestion des prescriptions médicales pour le CHU Andrainjato, Fianarantsoa (Madagascar).  
Le module Prescription permet aux médecins de créer et de suivre toutes les prescriptions (médicamenteuses, non médicamenteuses, surveillance, transfusion, bloc opératoire et para‑cliniques) liées à un patient.

---

## 📦 Stack technique

| Composant   | Technologie                              |
|-------------|------------------------------------------|
| Frontend    | Next.js 16 + TypeScript + CSS custom     |
| Backend     | NestJS 10 + Prisma 5 + PostgreSQL 18     |
| Authentification | JWT (JSON Web Tokens)                |
| Environnement | Kali Linux (développement)              |

---

## 🧱 Architecture

```
prescription/
├── prescription_frontend/   ← Next.js (port 3000)
│   ├── app/                 ← page.tsx, layout, globals.css
│   ├── components/          ← 12 formulaires de prescription
│   ├── lib/                 ← api.ts, printPrescription.ts
│   └── public/              ← documentation html
│
├── prescription_backend/    ← NestJS (port 3001)
│   ├── src/
│   │   ├── auth/            ← JWT
│   │   ├── patient/
│   │   ├── prescription/    ← un dossier par type de prescription
│   │   ├── notification/    ← notifications infirmier
│   │   └── prisma/          ← service Prisma
│   └── prisma/schema.prisma ← modèles de données
│
├── README.md
├── resume-session.md
└── documentation-projet.html
```

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js ≥ 18, npm
- PostgreSQL 18 (avec cluster `main` démarré)
- Lancer PostgreSQL si nécessaire : `sudo pg_ctlcluster 18 main start`

### 1. Backend
```bash
cd prescription_backend
npm install
npx prisma migrate dev   # la première fois
npm run start:dev
```

### 2. Frontend
```bash
cd prescription_frontend
npm install
npm run dev
```

Accéder à : [http://localhost:3000](http://localhost:3000)

---

## 🔑 Données de test

- **Email** : `jean@chu.mg`
- **Mot de passe** : `test1234`
- **Patient** : `IP-2026-00001` — RAKOTO Jean-Pierre, 38 ans, allergie Pénicilline
- **Prescripteur** : Dr RAKOTO (Médecine interne)

---

## 📋 Fonctionnalités

### 12 types de prescription

| Catégorie       | Formulaire               | Particularités |
|-----------------|--------------------------|----------------|
| Médicale        | `MedicaleForm`           | Recherche de médicaments (stock simulé), ordonnance ajustable, notification infirmier |
| Non Médicale    | `NonMedicaleForm`        | Durée avec unité, expiration automatique, notification infirmier |
| Surveillance    | `SurveillanceForm`       | Paramètres physiologiques, fréquence, notification infirmier |
| Transfusion     | `TransfusionForm`        | Groupe sanguin, produit, antécédent, dépôt de sang |
| Bloc Opératoire | `BlocForm`               | Intervention, risque hémorragique, chirurgien, demande CPA |
| Para‑clinique   | `LaboForm`               | 7 catégories d’analyses, sélection par cases à cocher |
|                 | `ImagerieForm`           | Scanner, écho, radio, geste, radio spéciale |
|                 | `AnapathForm`            | 7 onglets (FCV, cytoponction, liquide, biopsie, POS, POC, extemporané) |
|                 | `EEGForm`                | Protocoles techniques EEG |
|                 | `KineForm`               | Type kiné, diagnostic, contre‑indications, objectifs |
|                 | `DiaryseForm`            | Type de dialyse |
|                 | `EndoscopieForm`         | Type d’examen endoscopique |

### Fonctionnalités communes
- **Degré d’urgence** : Normal, Urgent, STAT (avec pastille de couleur)
- **Précautions & Alertes** : champ libre avec fond rouge
- **Validation avec résumé** : après envoi, une fenêtre s’ouvre avec le détail de la prescription (imprimable)
- **Prescriptions en cours** : liste dynamique (pour Médicale, Non Médicale, Surveillance) avec bouton pour terminer
- **Notification infirmier** : si activée, une notification est créée en base (entité dédiée)
- **Expiration automatique** : les prescriptions dont la durée est dépassée sont masquées

---

## 🔌 API principales

| Méthode | Route | Description |
|---------|-------|-------------|
| POST | `/auth/login` | Connexion JWT |
| GET | `/auth/profile` | Profil prescripteur connecté |
| GET | `/patients/:id` | Patient par ID permanent |
| POST | `/prescriptions/medicale` | Créer prescription médicale |
| POST | `/prescriptions/non-medicale` | Créer prescription non médicale |
| ... | ... | (un endpoint par type de prescription) |
| PUT | `/prescriptions/:type/:id/statut` | Changer le statut (ex: `TERMINEE`) |
| POST | `/notifications/medicale/:id` | Notifier infirmier (prescription médicale) |
| POST | `/notifications/non-medicale/:id` | Notifier infirmier (non médicale) |
| POST | `/notifications/surveillance/:id` | Notifier infirmier (surveillance) |

---

## 🎨 Design system

- Tous les formulaires utilisent un **layout 2 colonnes** (gauche = formulaire, droite = sticky 300px avec urgence + alertes + bouton valider)
- Les classes CSS sont définies dans `globals.css` (variables, `.card`, `.bp`, `.urgr`, `.rc`, `.tog`, `.mb`, etc.)
- **Règle absolue** : ne jamais modifier le design sans demande explicite

---


---

## 🤝 Contribuer

Les modifications doivent être faites avec `cat > fichier << 'EOF'` (pas de `sed` multiligne).  
Le code est versionné sur GitHub : `https://github.com/tsovosharine-ui/prescription-sih`.

---

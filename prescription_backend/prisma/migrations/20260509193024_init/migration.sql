-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenoms" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "poste" TEXT NOT NULL,
    "matricule" TEXT,
    "numeroOrdre" TEXT,
    "ordre" TEXT,
    "telephone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "idPermanent" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3),
    "sexe" TEXT,
    "telephone" TEXT,
    "adresse" TEXT,
    "allergies" TEXT[],
    "categorie" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionMedicale" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'ACTIVE',
    "remarques" TEXT,
    "notifierInfirmier" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionMedicale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicament" (
    "id" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "dose" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "voie" TEXT,
    "frequence" TEXT NOT NULL,
    "duree" TEXT NOT NULL,
    "dateDebut" TIMESTAMP(3),
    "heureDebut" TEXT,
    "instructions" TEXT,
    "remarques" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Medicament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ordonnance" (
    "id" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "medicaments" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ordonnance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionNonMedicale" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notifierInfirmier" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionNonMedicale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemNonMedical" (
    "id" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duree" TEXT,
    "frequence" TEXT,
    "dateDebut" TIMESTAMP(3),
    "heureDebut" TEXT,
    "instructions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ItemNonMedical_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionSurveillance" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "notifierInfirmier" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionSurveillance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParametreSurveillance" (
    "id" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "parametre" TEXT NOT NULL,
    "frequence" TEXT NOT NULL,
    "duree" TEXT,
    "seuil" TEXT,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ParametreSurveillance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionTransfusion" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "renseignements" TEXT NOT NULL,
    "atcdTransfusion" BOOLEAN NOT NULL DEFAULT false,
    "incident" TEXT,
    "groupage" TEXT NOT NULL,
    "hb" DOUBLE PRECISION,
    "produit" TEXT NOT NULL,
    "plaquettes" DOUBLE PRECISION,
    "quantite" TEXT,
    "datePrevue" TIMESTAMP(3),
    "notes" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'ENVOYEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionTransfusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionBloc" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "libelle" TEXT NOT NULL,
    "cote" TEXT,
    "dateIntervention" TIMESTAMP(3),
    "risqueHemorragique" TEXT,
    "typeChirurgie" TEXT,
    "consignes" TEXT,
    "chirurgien" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'DEMANDE_CPA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionBloc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionLabo" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "renseignements" TEXT NOT NULL,
    "analyses" TEXT[],
    "notes" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'CREEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionLabo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionImagerie" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "renseignements" TEXT NOT NULL,
    "statutPatient" TEXT,
    "examens" JSONB NOT NULL,
    "notes" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'CREEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionImagerie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionAnapath" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "typeExamen" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'CREEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionAnapath_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionEEG" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "renseignements" TEXT NOT NULL,
    "typeEEG" TEXT NOT NULL,
    "remarques" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'CREEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionEEG_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionKine" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "renseignements" TEXT NOT NULL,
    "typeKine" TEXT NOT NULL,
    "autreKine" TEXT,
    "diagnostic" TEXT,
    "contreIndications" TEXT[],
    "autreContreIndic" TEXT,
    "objectifs" TEXT,
    "remarques" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'CREEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionKine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionDialyse" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "renseignements" TEXT NOT NULL,
    "typeDialyse" TEXT NOT NULL,
    "remarques" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'CREEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionDialyse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrescriptionEndoscopie" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "prescripteurId" TEXT NOT NULL,
    "urgence" TEXT NOT NULL DEFAULT 'n',
    "alertes" TEXT,
    "renseignements" TEXT NOT NULL,
    "typeExamen" TEXT NOT NULL,
    "autreExamen" TEXT,
    "remarques" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'CREEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrescriptionEndoscopie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_idPermanent_key" ON "Patient"("idPermanent");

-- CreateIndex
CREATE UNIQUE INDEX "Ordonnance_prescriptionId_key" ON "Ordonnance"("prescriptionId");

-- AddForeignKey
ALTER TABLE "PrescriptionMedicale" ADD CONSTRAINT "PrescriptionMedicale_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionMedicale" ADD CONSTRAINT "PrescriptionMedicale_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicament" ADD CONSTRAINT "Medicament_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "PrescriptionMedicale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordonnance" ADD CONSTRAINT "Ordonnance_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "PrescriptionMedicale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionNonMedicale" ADD CONSTRAINT "PrescriptionNonMedicale_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionNonMedicale" ADD CONSTRAINT "PrescriptionNonMedicale_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNonMedical" ADD CONSTRAINT "ItemNonMedical_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "PrescriptionNonMedicale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionSurveillance" ADD CONSTRAINT "PrescriptionSurveillance_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionSurveillance" ADD CONSTRAINT "PrescriptionSurveillance_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParametreSurveillance" ADD CONSTRAINT "ParametreSurveillance_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "PrescriptionSurveillance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionTransfusion" ADD CONSTRAINT "PrescriptionTransfusion_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionTransfusion" ADD CONSTRAINT "PrescriptionTransfusion_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionBloc" ADD CONSTRAINT "PrescriptionBloc_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionBloc" ADD CONSTRAINT "PrescriptionBloc_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionLabo" ADD CONSTRAINT "PrescriptionLabo_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionLabo" ADD CONSTRAINT "PrescriptionLabo_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionImagerie" ADD CONSTRAINT "PrescriptionImagerie_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionImagerie" ADD CONSTRAINT "PrescriptionImagerie_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionAnapath" ADD CONSTRAINT "PrescriptionAnapath_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionAnapath" ADD CONSTRAINT "PrescriptionAnapath_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionEEG" ADD CONSTRAINT "PrescriptionEEG_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionEEG" ADD CONSTRAINT "PrescriptionEEG_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionKine" ADD CONSTRAINT "PrescriptionKine_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionKine" ADD CONSTRAINT "PrescriptionKine_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionDialyse" ADD CONSTRAINT "PrescriptionDialyse_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionDialyse" ADD CONSTRAINT "PrescriptionDialyse_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionEndoscopie" ADD CONSTRAINT "PrescriptionEndoscopie_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrescriptionEndoscopie" ADD CONSTRAINT "PrescriptionEndoscopie_prescripteurId_fkey" FOREIGN KEY ("prescripteurId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

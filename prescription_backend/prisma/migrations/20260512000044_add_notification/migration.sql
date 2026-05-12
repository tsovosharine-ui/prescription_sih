-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "destinataire" TEXT NOT NULL,
    "expediteurId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "referenceId" TEXT NOT NULL,
    "referenceType" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" JSONB NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'EN_ATTENTE',
    "tentatives" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "luAt" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

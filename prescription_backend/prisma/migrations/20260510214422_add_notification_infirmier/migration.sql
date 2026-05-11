-- CreateTable
CREATE TABLE "NotificationInfirmier" (
    "id" TEXT NOT NULL,
    "prescriptionMedicaleId" TEXT,
    "prescriptionNonMedicaleId" TEXT,
    "prescriptionSurveillanceId" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'ENVOYE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationInfirmier_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationInfirmier" ADD CONSTRAINT "NotificationInfirmier_prescriptionMedicaleId_fkey" FOREIGN KEY ("prescriptionMedicaleId") REFERENCES "PrescriptionMedicale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationInfirmier" ADD CONSTRAINT "NotificationInfirmier_prescriptionNonMedicaleId_fkey" FOREIGN KEY ("prescriptionNonMedicaleId") REFERENCES "PrescriptionNonMedicale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationInfirmier" ADD CONSTRAINT "NotificationInfirmier_prescriptionSurveillanceId_fkey" FOREIGN KEY ("prescriptionSurveillanceId") REFERENCES "PrescriptionSurveillance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

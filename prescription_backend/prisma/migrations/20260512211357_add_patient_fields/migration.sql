/*
  Warnings:

  - You are about to drop the `NotificationInfirmier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ItemNonMedical" DROP CONSTRAINT "ItemNonMedical_prescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "Medicament" DROP CONSTRAINT "Medicament_prescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationInfirmier" DROP CONSTRAINT "NotificationInfirmier_prescriptionMedicaleId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationInfirmier" DROP CONSTRAINT "NotificationInfirmier_prescriptionNonMedicaleId_fkey";

-- DropForeignKey
ALTER TABLE "NotificationInfirmier" DROP CONSTRAINT "NotificationInfirmier_prescriptionSurveillanceId_fkey";

-- DropForeignKey
ALTER TABLE "Ordonnance" DROP CONSTRAINT "Ordonnance_prescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "ParametreSurveillance" DROP CONSTRAINT "ParametreSurveillance_prescriptionId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionAnapath" DROP CONSTRAINT "PrescriptionAnapath_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionAnapath" DROP CONSTRAINT "PrescriptionAnapath_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionBloc" DROP CONSTRAINT "PrescriptionBloc_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionBloc" DROP CONSTRAINT "PrescriptionBloc_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionDialyse" DROP CONSTRAINT "PrescriptionDialyse_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionDialyse" DROP CONSTRAINT "PrescriptionDialyse_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionEEG" DROP CONSTRAINT "PrescriptionEEG_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionEEG" DROP CONSTRAINT "PrescriptionEEG_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionEndoscopie" DROP CONSTRAINT "PrescriptionEndoscopie_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionEndoscopie" DROP CONSTRAINT "PrescriptionEndoscopie_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionImagerie" DROP CONSTRAINT "PrescriptionImagerie_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionImagerie" DROP CONSTRAINT "PrescriptionImagerie_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionKine" DROP CONSTRAINT "PrescriptionKine_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionKine" DROP CONSTRAINT "PrescriptionKine_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionLabo" DROP CONSTRAINT "PrescriptionLabo_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionLabo" DROP CONSTRAINT "PrescriptionLabo_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionMedicale" DROP CONSTRAINT "PrescriptionMedicale_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionMedicale" DROP CONSTRAINT "PrescriptionMedicale_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionNonMedicale" DROP CONSTRAINT "PrescriptionNonMedicale_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionNonMedicale" DROP CONSTRAINT "PrescriptionNonMedicale_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionSurveillance" DROP CONSTRAINT "PrescriptionSurveillance_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionSurveillance" DROP CONSTRAINT "PrescriptionSurveillance_prescripteurId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionTransfusion" DROP CONSTRAINT "PrescriptionTransfusion_patientId_fkey";

-- DropForeignKey
ALTER TABLE "PrescriptionTransfusion" DROP CONSTRAINT "PrescriptionTransfusion_prescripteurId_fkey";

-- AlterTable
ALTER TABLE "ItemNonMedical" ALTER COLUMN "typeLabel" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "chambre" TEXT,
ADD COLUMN     "groupeSanguin" TEXT,
ADD COLUMN     "lit" TEXT,
ADD COLUMN     "service" TEXT,
ADD COLUMN     "typeHospital" TEXT;

-- DropTable
DROP TABLE "NotificationInfirmier";

-- AddForeignKey
ALTER TABLE "Medicament" ADD CONSTRAINT "Medicament_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "PrescriptionMedicale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ordonnance" ADD CONSTRAINT "Ordonnance_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "PrescriptionMedicale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemNonMedical" ADD CONSTRAINT "ItemNonMedical_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "PrescriptionNonMedicale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParametreSurveillance" ADD CONSTRAINT "ParametreSurveillance_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "PrescriptionSurveillance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

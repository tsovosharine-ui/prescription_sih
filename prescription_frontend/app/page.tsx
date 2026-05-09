"use client";
import PrescriptionLayout, { Section } from '@/components/prescription/PrescriptionLayout';
import MedicaleForm from '@/components/prescription/MedicaleForm';
import NonMedicaleForm from '@/components/prescription/NonMedicaleForm';
import SurveillanceForm from '@/components/prescription/SurveillanceForm';
import TransfusionForm from '@/components/prescription/TransfusionForm';
import LaboForm from '@/components/prescription/para/LaboForm';
import ImagerieForm from '@/components/prescription/para/ImagerieForm';
import AnapathForm from '@/components/prescription/para/AnapathForm';
import EEGForm from '@/components/prescription/para/EEGForm';
import KineForm from '@/components/prescription/para/KineForm';
import DiaryseForm from '@/components/prescription/para/DiaryseForm';
import BlocForm from '@/components/prescription/BlocForm';
import EndoscopieForm from '@/components/prescription/para/EndoscopieForm';

export default function Home() {
  return (
    <PrescriptionLayout>
      {(section: Section) => {
        switch (section) {
          case 'med':   return <MedicaleForm />;
          case 'nm':    return <NonMedicaleForm />;
          case 'surv':  return <SurveillanceForm />;
          case 'trans': return <TransfusionForm />;
          case 'labo':  return <LaboForm />;
          case 'imag':  return <ImagerieForm />;
          case 'ana':   return <AnapathForm />;
          case 'eeg':   return <EEGForm />;
          case 'kine':  return <KineForm />;
          case 'dial':  return <DiaryseForm />;
          case 'endo':  return <EndoscopieForm />;
          case 'bloc':  return <BlocForm />;
          default: return (
            <div style={{textAlign:'center',padding:'40px',color:'var(--txt3)',fontSize:'14px'}}>
              Section en cours de développement
            </div>
          );
        }
      }}
    </PrescriptionLayout>
  );
}

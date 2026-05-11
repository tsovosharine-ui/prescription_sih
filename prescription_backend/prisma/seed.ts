import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Créer un utilisateur de test
  const password = await bcrypt.hash('test1234', 10);
  const user = await prisma.user.upsert({
    where: { email: 'jean@chu.mg' },
    update: {},
    create: {
      email: 'jean@chu.mg',
      password,
      poste: 'Médecin',
      nom: 'RAKOTO',
      prenoms: 'Jean',
    },
  });

  // Créer un patient de test
  const patient = await prisma.patient.upsert({
    where: { idPermanent: 'IP-2026-00001' },
    update: {},
    create: {
      idPermanent: 'IP-2026-00001',
      nom: 'RAKOTO',
      prenom: 'Jean-Pierre',
      dateNaissance: new Date('1988-03-15'),
      sexe: 'M',
      adresse: 'Fianarantsoa',
      telephone: '+261 34 00 000 00',
      allergies: ['Pénicilline'],
    },
  });

  console.log('Données de test insérées avec succès');
  console.log('User:', user.email);
  console.log('Patient:', patient.nom, patient.prenom, patient.idPermanent);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

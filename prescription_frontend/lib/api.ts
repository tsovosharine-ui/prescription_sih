const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ── AUTH ──────────────────────────────────────────────────────
export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Identifiants incorrects');
  return res.json();
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
}

export function removeToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Impossible de récupérer le profil');
  return res.json();
}

// ── HEADERS ───────────────────────────────────────────────────
function authHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`,
  };
}

// ── PATIENTS ──────────────────────────────────────────────────
export async function getPatient(id: string) {
  const res = await fetch(`${API_URL}/patients/${id}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Patient introuvable');
  return res.json();
}

export async function searchPatients(q: string) {
  const res = await fetch(`${API_URL}/patients/search?q=${q}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Erreur recherche');
  return res.json();
}

// ── PRESCRIPTIONS ─────────────────────────────────────────────
async function handleResponse(res: Response) {
  if (!res.ok) {
    let message = 'Erreur lors de la création de la prescription.';
    try {
      const error = await res.json();
      message = error.message || message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export async function creerPrescriptionMedicale(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/medicale`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionNonMedicale(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/non-medicale`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionSurveillance(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/surveillance`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionTransfusion(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/transfusion`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionBloc(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/bloc`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionLabo(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/labo`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionImagerie(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/imagerie`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionAnapath(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/anapath`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionEEG(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/eeg`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionKine(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/kine`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionDialyse(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/dialyse`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function creerPrescriptionEndoscopie(data: unknown) {
  const res = await fetch(`${API_URL}/prescriptions/endoscopie`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function getPrescriptionsPatient(type: string, patientId: string) {
  const res = await fetch(`${API_URL}/prescriptions/${type}/patient/${patientId}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Erreur récupération prescriptions');
  return res.json();
}

export async function notifierInfirmierMedicale(prescriptionId: string) {
  const res = await fetch(`${API_URL}/notifications/medicale/${prescriptionId}`, {
    method: 'POST', headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Erreur notification');
  return res.json();
}

export async function notifierInfirmierNonMedicale(prescriptionId: string) {
  const res = await fetch(`${API_URL}/notifications/non-medicale/${prescriptionId}`, {
    method: 'POST', headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Erreur notification');
  return res.json();
}

export async function notifierInfirmierSurveillance(prescriptionId: string) {
  const res = await fetch(`${API_URL}/notifications/surveillance/${prescriptionId}`, {
    method: 'POST', headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Erreur notification');
  return res.json();
}

export async function updateStatutPrescription(type: string, id: string, statut: string) {
  const res = await fetch(`${API_URL}/prescriptions/${type}/${id}/statut`, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify({ statut }),
  });
  if (!res.ok) throw new Error('Erreur mise à jour statut');
  return res.json();
}

// index.js  – Cloud Function Node 20 (ESM)
import fetch, { Headers } from 'node-fetch';   // v3 (ESM)
import { load } from 'cheerio';                // pas d'export default
// ─── Configuration Firestore ───────────────────────────────────────────
import admin from 'firebase-admin';
if (!admin.apps.length) {
  admin.initializeApp();               // credentials auto dans Cloud Functions
}
const db = admin.firestore();

// ─── Aide : envoi de notification ntfy.sh ──────────────────────────────
import https from 'node:https';
/* ────────────────────────────────────────────────────────────────────────────
   Constantes
──────────────────────────────────────────────────────────────────────────── */
const CAS_LOGIN = 'https://cas.univ-lille.fr/login';
const SERVICE =
  'https://iuta-bulletin.univ-lille.fr/services/doAuth.php' +
  '?href=https%3A%2F%2Fiuta-bulletin.univ-lille.fr%2F';

/* ────────────────────────────────────────────────────────────────────────────
   Utilitaires
──────────────────────────────────────────────────────────────────────────── */
const toFloat = (v) => {
  const n = parseFloat(String(v ?? '').replace(',', '.'));
  return Number.isNaN(n) ? null : n;
};

/** Stocke les cookies dans un simple objet-clé => valeur. */
const updateCookieJar = (resp, jar) => {
  (resp.headers.raw()['set-cookie'] || []).forEach((c) => {
    const [pair] = c.split(';');
    const [name, value] = pair.split('=');
    jar[name] = value;
  });
};
const cookieHeader = (jar) =>
  Object.entries(jar)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');

/* ────────────────────────────────────────────────────────────────────────────
   Fonction Cloud Function HTTP
──────────────────────────────────────────────────────────────────────────── */
export const getNotesSummary = async (req, res) => {

    /* ───────────────────────── CORS ───────────────────────── */
  // Autorise toutes origines (tu peux remplacer * par ton domaine)
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Répond immédiatement aux pré-vols OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(204).send('');   // No Content
    return;
  }
  /* ───────────────────────────────────────────────────────── */
  try {
    // 0) Credentials via variables d'environnement
    const { ULILLE_USER, ULILLE_PASS } = process.env;
    if (!ULILLE_USER || !ULILLE_PASS) {
      return res.status(500).json({ error: 'Missing ULILLE_USER / ULILLE_PASS' });
    }

    /* ─── 1. Authentification CAS ────────────────────────────────────────── */
    const jar = {};
    let r = await fetch(`${CAS_LOGIN}?service=${encodeURIComponent(SERVICE)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    updateCookieJar(r, jar);
    const $login = load(await r.text());
    const execution = $login('input[name="execution"]').attr('value');

    r = await fetch(`${CAS_LOGIN}?service=${encodeURIComponent(SERVICE)}`, {
      method: 'POST',
      redirect: 'manual',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: cookieHeader(jar),
      },
      body: new URLSearchParams({
        username: ULILLE_USER,
        password: ULILLE_PASS,
        execution,
        _eventId: 'submit',
        geolocation: '',
      }),
    });
    updateCookieJar(r, jar);
    const ticketLoc = r.headers.get('location');

    // Récupère le PHPSESSID
    r = await fetch(ticketLoc, {
      redirect: 'manual',
      headers: { Cookie: cookieHeader(jar) },
    });
    updateCookieJar(r, jar);

    /* ─── 2. Appel de l’API bulletin ────────────────────────────────────── */
    r = await fetch(
      'https://iuta-bulletin.univ-lille.fr/services/data.php?q=dataPremièreConnexion',
      {
        method: 'POST',
        headers: {
          Origin: 'https://iuta-bulletin.univ-lille.fr',
          Referer: 'https://iuta-bulletin.univ-lille.fr/',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          Cookie: cookieHeader(jar),
        },
        body: '',
      }
    );
    const dataFull = await r.json();
    const releve = dataFull.relevé || dataFull.releve;
    if (!releve) throw new Error("clé 'relevé' absente dans la réponse API");

    /* ─── 3. Transformation → résumé JSON ───────────────────────────────── */
    const { semestre = {}, ues = {}, ressources: ress = {}, saes = {} } = releve;

    // Collecte toutes les évaluations notées
    const collectEvals = (src) => {
      const out = [];
      for (const [parent, obj] of Object.entries(src)) {
        for (const ev of obj.evaluations ?? []) {
          const noteVal = toFloat(ev.note?.value);
          if (noteVal == null) continue;
          out.push({
            evaluation: ev.description,
            note: noteVal,
            coef: toFloat(ev.coef),
            date: ev.date || ev.date_debut,
            parent,
            poids: ev.poids || {},
          });
        }
      }
      return out;
    };

    const evaluationsByUe = Object.fromEntries(Object.keys(ues).map((k) => [k, []]));

    for (const ev of [...collectEvals(ress), ...collectEvals(saes)]) {
      for (const [ueCode, w] of Object.entries(ev.poids)) {
        if (w) {
          const { poids, ...clean } = ev;
          (evaluationsByUe[ueCode] ||= []).push(clean);
        }
      }
    }

    const summary = {
      semestre: semestre.numero,
      annee_universitaire: semestre.annee_universitaire,
      moyenne_generale: toFloat(semestre.notes?.value),
      rang: {
        position: semestre.rang?.value,
        total: semestre.rang?.total,
      },
      UE: Object.fromEntries(
        Object.entries(ues)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([code, ue]) => [
            code,
            {
              titre: ue.titre,
              moyenne: toFloat(ue.moyenne?.value),
            },
          ])
      ),
      evaluations: evaluationsByUe,
    };

    /* ─── 4. Réponse ────────────────────────────────────────────────────── */
    res.set('Content-Type', 'application/json; charset=utf-8');
    res.status(200).send(JSON.stringify(summary, null, 2));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};







async function sendNtfy(message, title = 'Notes IUT') {
  const topic   = 'liddevotretopic';
  const bearer  = 'votre_token_ntfy';
  const dataBuf = Buffer.from(message, 'utf-8');

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'ntfy.sh',
        port: 443,
        path: `/${encodeURIComponent(topic)}`,
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Markdown': 'yes',
          'Title': title,
          'Content-Length': dataBuf.length,
          ...(bearer && { Authorization: `Bearer ${bearer}` }),
        },
      },
      (res) => {
        res.on('data', () => {});
        res.on('end', resolve);
      }
    );
    req.on('error', reject);
    req.write(dataBuf);
    req.end();
  });
}

// ─── Fonction CRON : syncNotesSummary ──────────────────────────────────

export const syncNotesSummary = async (req, res) => {
  try {
    /* 1) Récupérer le résumé depuis la 1ʳᵉ fonction */
    const summaryUrl = "https://VOTRELIENICI.cloudfunctions.net/getNotesSummary";
    if (!summaryUrl)
      throw new Error('SUMMARY_URL env var manquante');

    const summary = await fetch(summaryUrl).then((r) => r.json());

    /* 2) Calcul des indicateurs courants */
    const evaluations = Object.values(summary.evaluations || {}).flat();
    const notesCount  = evaluations.length;
    const moyenne     = Number(summary.moyenne_generale) || 0;

    /* 3) Lecture du dernier état Firestore */
    const docRef  = db.collection('subinfos').doc('current');
    const docSnap = await docRef.get();
    const prev    = docSnap.exists ? docSnap.data() : { notesCount: 0, moyenne: 0 };

    const deltaCount = notesCount - (prev.notesCount || 0);
    const deltaMoy   = +(moyenne - (prev.moyenne || 0)).toFixed(2);

    /* 4) Si changement, on met Firestore à jour et on notifie */
    if (deltaCount !== 0 || deltaMoy !== 0) {
      // Mise à jour Firestore
      await docRef.set(
        {
          notesCount,
          moyenne,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      // Notification ntfy
      const plural = Math.abs(deltaCount) > 1 ? 's' : '';
      const sign   = deltaMoy >= 0 ? '+' : '';
      const message = `${deltaCount} Nouvelle${plural} note${plural} détectée${plural}, ` +
                      `moy : ${moyenne.toFixed(2)} (${sign}${deltaMoy.toFixed(2)})`;
      await sendNtfy(message, 'Mise a jour des notes');
    }

    res.status(200).send('Sync OK');
  } catch (err) {
    console.error(err);
    res.status(500).send('Sync failed: ' + err.message);
  }
};
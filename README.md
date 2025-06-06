<img alt="OutOf20" src="blob/banners.png" width="100%" />


# OutOf20 – Portail étudiant

Ce dépôt GitHub contient :

1. **Un front-end** React / TypeScript (Vite + Tailwind) pour l’affichage des bulletins et indicateurs.
2. **Un back-end serverless** (Cloud Functions Gen 2) permettant :

   * de récupérer le relevé de notes via CAS (`getNotesSummary`) ;
   * de synchroniser ces données dans Firestore et d’émettre une notification ntfy (`syncNotesSummary`), généralement déclenché par Cloud Scheduler.

---

## Architecture générale

```
.
├── README.md
├── frontend/                # Vite + React 18 (TS) + Tailwind
│   ├── index.html
│   ├── src/
│   └── vite.config.ts
└── bulletins/               # Fonctions Cloud Functions Gen 2 (Node 20)
    ├── index.js             # getNotesSummary + syncNotesSummary
    ├── package.json
    └── node_modules/
```

---

## 1. Front-end

| Catégorie            | Outils / Versions             |
| -------------------- | ----------------------------- |
| Framework            | React 18.3.1                  |
| Langage              | TypeScript                    |
| Bundler / Dev-server | Vite                          |
| Styling              | Tailwind CSS 3.4.1            |
| Qualité de code      | ESLint + `@typescript-eslint` |

### Installation et exécution locale

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Définir l’URL de l’API dans un `.env` :

```
VITE_API_URL=https://us-central1-<projet>.cloudfunctions.net/getNotesSummary
```

---

## 2. Back-end (Cloud Functions Gen 2)

### Fonctions

| Fonction           | Rôle                                                                                                    | Déclencheur      |
| ------------------ | ------------------------------------------------------------------------------------------------------- | ---------------- |
| `getNotesSummary`  | Authentifie l’étudiant sur le CAS ULille, interroge l’API « bulletin », renvoie le JSON compacté        | HTTP             |
| `syncNotesSummary` | Appelle `getNotesSummary`, compare les données avec Firestore `subinfos/current`, met à jour et notifie | HTTP (Scheduler) |

### Variables d’environnement

| Nom                 | Requis | Description                             |
| ------------------- | ------ | --------------------------------------- |
| `ULILLE_USER/PASS`  | Oui    | Identifiants CAS pour `getNotesSummary` |
| `SUMMARY_URL`       | Oui    | URL publique de `getNotesSummary`       |
| `NTFY_TOPIC/BEARER` | Option | Sujet et token d’auth pour ntfy.sh      |

### Tests locaux

```bash
cd bulletins
npm install
npx google-cloud-functions-framework --target=getNotesSummary
```

---

## 3. Déploiement Google Cloud

### Construction du front

```bash
cd frontend
npm run build             # dossier dist/ prêt pour Hosting
```

### Déploiement des fonctions

```bash
cd bulletins

# getNotesSummary
gcloud functions deploy getNotesSummary \
  --gen2 --runtime=nodejs20 --trigger-http \
  --source=. --entry-point=getNotesSummary \
  --region=YOUR_REGION --allow-unauthenticated \
  --set-env-vars=ULILLE_USER="login",ULILLE_PASS="password"

# syncNotesSummary
gcloud functions deploy syncNotesSummary \
  --gen2 --runtime=nodejs20 --trigger-http \
  --source=. --entry-point=syncNotesSummary \
  --region=YOUR_REGION --allow-unauthenticated \
  --set-env-vars=SUMMARY_URL="https://YOUR_REGION-<projet>.cloudfunctions.net/getNotesSummary",\
NTFY_TOPIC="pokendyads",NTFY_BEARER="token_..."
```

### Planification Cloud Scheduler

```bash
gcloud scheduler jobs create http sync-notes-10min \
  --schedule="*/10 * * * *" \
  --time-zone="Europe/Paris" \
  --uri="https://us-central1-<projet>.cloudfunctions.net/syncNotesSummary" \
  --http-method=GET
```

---

## 4. Modèle Firestore

```
subinfos
└── current
    ├── notesCount : number     # nombre d’évaluations
    ├── moyenne    : number     # moyenne générale
    └── updatedAt  : timestamp  # dernière mise à jour
```

Une variation déclenche une notification ntfy :

```
2 Nouvelle(s) note(s) détectée(s), moy : 12.50 (+0.35)
```

---

## 5. Qualité et bonnes pratiques

* ESLint via `npm run lint` (front et back).
* Secrets exclusivement via variables d’environnement.
* Initialisation `firebase-admin` sans clés explicites (runtime Cloud Functions).
* Tailwind : approche utility-first, pas de CSS global lourd.

---

## Licence

Projet OutOf20 – distribué sous licence MIT.

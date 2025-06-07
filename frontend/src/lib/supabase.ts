// Remove Supabase dependency and use direct Google Cloud Functions call
export const fetchGrades = async (demo: boolean = false) => {
  // If demo requested, return mock data
  if (demo) {
    const mockData = {
      "semestre": 2,
      "annee_universitaire": "2024 - 2025",
      "moyenne_generale": 16.12,
      "rang": {
        "position": "5",
        "total": 133
      },
      "UE": {
        "UE 2.1": {
          "titre": "Réaliser un développement d'applications",
          "moyenne": 17.43
        },
        "UE 2.2": {
          "titre": "Optimiser des applications informatiques",
          "moyenne": 18.92
        },
        "UE 2.3": {
          "titre": "Administrer des systèmes informatiques communicants complexes",
          "moyenne": 14.33
        },
        "UE 2.4": {
          "titre": "Gérer des données de l'information",
          "moyenne": 16.35
        },
        "UE 2.5": {
          "titre": "Conduire un projet",
          "moyenne": 15.96
        },
        "UE 2.6": {
          "titre": "Travailler dans une équipe informatique",
          "moyenne": 13.71
        }
      },
      "evaluations": {
        "UE 2.1": [
          {
            "evaluation": "DS1 (UE2.1)",
            "note": 17.83,
            "coef": 3.0,
            "date": "2025-03-20T15:30:00+01:00",
            "parent": "R 2.01"
          },
          {
            "evaluation": "DS2 (UE2.1)",
            "note": 20.0,
            "coef": 2.0,
            "date": "2025-05-22T13:30:00+02:00",
            "parent": "R 2.01"
          },
          {
            "evaluation": "ECRIT Défendre une cause",
            "note": 12.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Oral Défendre une cause",
            "note": 13.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Dossier préparatoire écrit 1ère et 2ème partie + Scénario  et commentaire voix off",
            "note": 15.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          }
        ],
        "UE 2.2": [
          {
            "evaluation": "DS1 (UE2.2)",
            "note": 17.83,
            "coef": 3.0,
            "date": "2025-03-20T15:30:00+01:00",
            "parent": "R 2.01"
          },
          {
            "evaluation": "DS2 (UE2.2)",
            "note": 20.0,
            "coef": 2.0,
            "date": "2025-05-22T13:30:00+02:00",
            "parent": "R 2.01"
          },
          {
            "evaluation": "Note TP (UE2.2)",
            "note": 19.6,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.07"
          },
          {
            "evaluation": "DS (UE2.2)",
            "note": 16.1,
            "coef": 3.0,
            "date": null,
            "parent": "R 2.07"
          },
          {
            "evaluation": "DS (UE2.2)",
            "note": 18.0,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.09"
          }
        ],
        "UE 2.3": [
          {
            "evaluation": "IE (UE2.3)",
            "note": 15.0,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.12"
          },
          {
            "evaluation": "DS (UE2.3)",
            "note": 15.0,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.12"
          },
          {
            "evaluation": "ECRIT Défendre une cause",
            "note": 12.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Oral Défendre une cause",
            "note": 13.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Dossier préparatoire écrit 1ère et 2ème partie + Scénario  et commentaire voix off",
            "note": 15.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          }
        ],
        "UE 2.4": [
          {
            "evaluation": "QCM (UE2.4)",
            "note": 15.0,
            "coef": 1.0,
            "date": "2025-03-11T08:00:00+01:00",
            "parent": "R 2.06"
          },
          {
            "evaluation": "DS (UE2.4)",
            "note": 18.5,
            "coef": 3.0,
            "date": null,
            "parent": "R 2.06"
          },
          {
            "evaluation": "DS (UE2.4)",
            "note": 17.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.08"
          },
          {
            "evaluation": "IE gestion comptable et financière",
            "note": 18.75,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.10"
          },
          {
            "evaluation": "Rendu gestion de projet",
            "note": 18.0,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.10"
          },
          {
            "evaluation": "IE (UE2.4)",
            "note": 15.0,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.12"
          },
          {
            "evaluation": "DS (UE2.4)",
            "note": 15.0,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.12"
          },
          {
            "evaluation": "CTP",
            "note": 13.5,
            "coef": 2.0,
            "date": null,
            "parent": "S 2.04"
          },
          {
            "evaluation": "Rendu Stats",
            "note": 16.5,
            "coef": 1.0,
            "date": null,
            "parent": "S 2.04"
          },
          {
            "evaluation": " Rendu Gestion",
            "note": 14.75,
            "coef": 1.0,
            "date": null,
            "parent": "S 2.04"
          }
        ],
        "UE 2.5": [
          {
            "evaluation": "IE gestion comptable et financière",
            "note": 18.75,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.10"
          },
          {
            "evaluation": "Rendu gestion de projet",
            "note": 18.0,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.10"
          },
          {
            "evaluation": "ECRIT Défendre une cause",
            "note": 12.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Oral Défendre une cause",
            "note": 13.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Dossier préparatoire écrit 1ère et 2ème partie + Scénario  et commentaire voix off",
            "note": 15.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Dossier de gestion de projet",
            "note": 14.75,
            "coef": 1.0,
            "date": "2025-04-26T00:00:00+02:00",
            "parent": "S 2.05"
          }
        ],
        "UE 2.6": [
          {
            "evaluation": "DS (UE2.6)",
            "note": 14.5,
            "coef": 2.0,
            "date": "2025-03-27T13:30:00+01:00",
            "parent": "R 2.11"
          },
          {
            "evaluation": "Interrogation (UE2.6)",
            "note": 13.5,
            "coef": 1.0,
            "date": "2025-03-06T13:30:00+01:00",
            "parent": "R 2.11"
          },
          {
            "evaluation": "ECRIT Défendre une cause",
            "note": 12.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Oral Défendre une cause",
            "note": 13.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          },
          {
            "evaluation": "Dossier préparatoire écrit 1ère et 2ème partie + Scénario  et commentaire voix off",
            "note": 15.5,
            "coef": 1.0,
            "date": null,
            "parent": "R 2.13"
          }
        ]
      }
    };

    // Simulate a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockData;
  }

  try {
    // Call Google Cloud Functions endpoint directly
    const response = await fetch('https://us-central1-pokendystorm-ff671.cloudfunctions.net/getNotesSummary', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.details || data.error);
    }

    return data;
  } catch (error) {
    console.error('Error fetching grades from Google Cloud Functions:', error);
    throw error;
  }
};
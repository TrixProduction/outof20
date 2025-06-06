export interface GradeData {
  semestre: number;
  annee_universitaire: string;
  moyenne_generale: number;
  rang: {
    position: string;
    total: number;
  };
  UE: Record<string, {
    titre: string;
    moyenne: number;
  }>;
  evaluations: Record<string, Evaluation[]>;
}

export interface Evaluation {
  evaluation: string;
  note: number;
  coef: number;
  date: string | null;
  parent: string;
}
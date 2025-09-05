// encaissements/types/periode.ts
export const PERIODES = ['aujourdhui', 'cette_semaine', 'ce_mois', 'cette_annee'] as const;
export type Periode = typeof PERIODES[number];

export const PERIODE_LABELS: Record<Periode, string> = {
  aujourdhui: "Aujourd'hui",
  cette_semaine: 'Cette semaine',
  ce_mois: 'Ce mois-ci',
  cette_annee: 'Cette année',
};

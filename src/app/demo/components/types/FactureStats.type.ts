import { Periode } from './periode.type';

export type FactureStatsBreakdown = {
  count: number;
  total_ttc: number;
};

export type FactureStatsType = {
  range: { from: string|null; to: string|null };
  factures: {
    count: number;
    total_ttc: number;
    montant_du_total: number;
    par_statut: Record<'brouillon'|'partiel'|'payé'|'impayé', { count: number; total_ttc: number }>;
  };
};


export type FactureStatsQueryType = {
  periode?: Periode;   // 'aujourdhui' | 'cette_semaine' | 'ce_mois' | 'cette_annee'
  date_from?: string;  // YYYY-MM-DD
  date_to?: string;    // YYYY-MM-DD
};

import { Periode } from './periode.type';

export type CommandeStatsType = {
  range: {
    from: string | null;
    to: string | null;
  };
  commandes: {
    count: number;
    total: number;
    // Les statuts sont dynamiques, chaque clé est un statut (ex: "brouillon", "livre", etc.)
    par_statut: Record<string, {
      count: number;
      montant?: number; // si ton back renvoie un montant par statut
    }>;
  };
};

export type CommandeStatsQueryType = {
  periode?: Periode;   // 'aujourdhui' | 'cette_semaine' | 'ce_mois' | 'cette_annee'
  date_from?: string;  // YYYY-MM-DD
  date_to?: string;    // YYYY-MM-DD
};

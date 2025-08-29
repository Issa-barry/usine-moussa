export type EncaissementMode = 'espèces' | 'orange-money' | 'dépot-banque';

export interface Encaissement {
  id: number;
  facture_id: number;
  montant: number;
  mode: EncaissementMode;
  reference?: string | null;
  commentaire?: string | null;
  date_encaissement: string; // ISO
  created_at?: string;
  updated_at?: string;

  // relation optionnelle (si tu fais with('facture'))
  facture?: {
    id: number;
    numero: string;
    statut: 'brouillon' | 'partiel' | 'payé' | 'impayé';
    total: number;
    montant_du: number;
  };
}

export interface CreateEncaissementDto {
  facture_id: number;
  montant: number;
  mode?: EncaissementMode;
  date_encaissement?: string; // ISO
  reference?: string;
  commentaire?: string;
}

export interface UpdateEncaissementDto extends Partial<CreateEncaissementDto> {}

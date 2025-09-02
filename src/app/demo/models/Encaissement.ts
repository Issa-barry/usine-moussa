export type EncaissementMode = 'espèces' | 'orange-money' | 'dépot-banque';

export class Encaissement {
  id?: number;
  facture_id?: number;
  montant: number;
  mode_paiement: EncaissementMode;   // ✅ typé sur EncaissementMode
  reference?: string | null;
  commentaire?: string | null;
  date_encaissement: string;

  constructor() {
    this.montant = 0;
    this.mode_paiement = 'espèces';   // ✅ défaut typé
    this.date_encaissement = new Date().toISOString().slice(0, 10);
  }
}

export interface CreateEncaissementDto {
  facture_id: number;
  montant: number;
  mode?: EncaissementMode;           // ✅ le DTO prend EncaissementMode aussi
  date_encaissement?: string;
  reference?: string;
  commentaire?: string;
}

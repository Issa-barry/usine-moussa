import { Produit } from './produit.model';

export class LivraisonLigne {
  id?: number;
  livraison_id!: number;
  produit_id!: number;

  // --- API fields (alignés)
  quantite_livree!: number;     // ex-quantite
  prix_vente?: number;          // prix unitaire au moment de la livraison

  // --- Méta
  created_at?: string;
  updated_at?: string;

  // --- Relation
  produit?: Produit;

  // --- Dérivé (UI)
  sous_total?: number;

  constructor(init?: Partial<LivraisonLigne>) {
    Object.assign(this, init);

    // Normalisation numérique
    if (this.prix_vente !== undefined) this.prix_vente = Number(this.prix_vente);
    if (this.quantite_livree !== undefined) this.quantite_livree = Number(this.quantite_livree);

    // Calcul dérivé
    if (this.quantite_livree !== undefined && this.prix_vente !== undefined) {
      this.sous_total = Number(this.quantite_livree) * Number(this.prix_vente);
    }
  }

  /** Mappe une ligne renvoyée par l’API vers le modèle */
  static fromApi(raw: any): LivraisonLigne {
    return new LivraisonLigne({
      id: raw?.id,
      livraison_id: raw?.livraison_id,
      produit_id: raw?.produit_id,
      quantite_livree: Number(raw?.quantite_livree ?? raw?.quantite ?? 0),
      prix_vente: Number(raw?.prix_vente ?? raw?.produit?.prix_vente ?? 0),
      created_at: raw?.created_at,
      updated_at: raw?.updated_at,
      produit: raw?.produit,
    });
  }
}

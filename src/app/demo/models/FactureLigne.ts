export interface FactureLigne {
  id?: number;
  facture_id: number;
  produit_id: number;
  quantite: number;
  prix_unitaire_ht: number;
  montant_ht: number;
  montant_ttc: number;
  created_at?: string;
  updated_at?: string;

  // Optionnel si tu charges le produit dans les réponses
  produit?: {
    id: number;
    nom: string;
    // ajoute d’autres champs produit au besoin
  };
}

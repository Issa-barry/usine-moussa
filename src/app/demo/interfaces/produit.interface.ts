export interface Produit {
  id?: number;
  code?: string;
  nom: string;
  prix_vente: number;
  quantite_stock: number;
  categorie: string;
  prix_achat?: number;
  cout?: number;
  image?: string;
  created_at?: string;
  updated_at?: string;
}

import { Produit } from './produit.model';

export interface CommandeLigne {
  produit_id: number;
  produit?: Produit;
  prix_vente: number;
  quantite: number;
}

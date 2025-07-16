import { Produit } from './produit.model';

export class PackingLigne {
  id?: number;
  packing_id!: number;
  produit_id!: number;
  quantite_utilisee!: number;

  // Relation (optionnelle)
  produit?: Produit;

  constructor(init?: Partial<PackingLigne>) {
    Object.assign(this, init);
  }
}

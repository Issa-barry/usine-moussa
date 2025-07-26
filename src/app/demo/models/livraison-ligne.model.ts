import { Produit } from './produit.model';

export class LivraisonLigne {
    id?: number;
    livraison_id!: number;
    produit_id!: number;
    quantite!: number;
    montant_payer!: number;
    updated_at?: string;

    // relation
    produit?: Produit;

    constructor(init?: Partial<LivraisonLigne>) {
        Object.assign(this, init);
    }
}

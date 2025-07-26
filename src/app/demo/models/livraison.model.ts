 import { Commande } from './commande.model';
import { Contact } from './contact';
import { LivraisonLigne } from './livraison-ligne.model';
 

export class Livraison {
    id?: number;
    commande_id!: number;
    client_id!: number;
    date_livraison!: string;
    statut!: 'en_cours' | 'livré' | 'en_attente' | 'annulé';
    quantite?: number;
    reference?: string;
    quantite_total?: number;

    // relations
    commande?: Commande;
    client?: Contact;
    livreur?: Contact;
    lignes: LivraisonLigne[] = [];

    constructor(init?: Partial<Livraison>) {
        Object.assign(this, init);
    }

    
}

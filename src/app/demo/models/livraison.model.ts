 import { Commande } from './commande.model';
import { Contact } from './contact';
import { LivraisonLigne } from './livraison-ligne.model';
 

export class Livraison {
    id?: number;
    commande_id!: number;
    date_livraison!: string;
    quantite_livree?: number;
    reference?: string;
 
    // relations
    commande?: Commande;
    livreur?: Contact;
    lignes: LivraisonLigne[] = [];

    constructor( ) {
        this.date_livraison = new Date().toISOString().split('T')[0]; // Date actuelle au format YYYY-MM-DD
        this.quantite_livree = 0;
    }

    // constructor(init?: Partial<Livraison>) {
    //     Object.assign(this, init);
    // }

    
}

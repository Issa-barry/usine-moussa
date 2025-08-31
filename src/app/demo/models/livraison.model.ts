import { Commande } from "./commande.model";
import { Contact } from "./contact";
import { LivraisonLigne } from "./livraison-ligne.model";

export class Livraison {
  id?: number;
  commande_id!: number;
  date_livraison!: string;
  quantite_livree?: number;
  reference?: string;

  commande?: Commande;
  livreur?: Contact;
  lignes: LivraisonLigne[] = [];

  constructor() {
    this.date_livraison = new Date().toISOString().split('T')[0];
    this.quantite_livree = 0;
  }

  /** Ne renvoie que ce que l’API attend pour /livraisons/valider/{numero} */
  toValidationDto(): { date_livraison: string; quantite_livree: number; livreur_id?: number } {
    return {
      date_livraison: this.date_livraison,
      quantite_livree: Number(this.quantite_livree ?? 0),
      ...(this.livreur?.id ? { livreur_id: this.livreur.id } : {})
    };
  }
}

import { CommandeLigne } from './commande-ligne.model';
import { Contact } from './contact';
import { Livraison } from './livraison.model';

export type CommandeStatut =
  | 'brouillon'
  | 'livraison_en_cours'
  | 'livré'
  | 'cloturé'
  | 'annulé'
  | 'payé';

export class Commande {
  id?: number;

  numero: string;
  count: number;

  contact_id: number;
  contact?: Contact;

  lignes?: CommandeLigne[];
  livraisons?: Livraison[];

  // Dates renvoyées par l'API (string ISO)
  created_at?: string;
  updated_at?: string;

  // Agrégats ajoutés par l'API (withSum)
  qte_total?: number;   // somme des quantités commandées
  qte_livree?: number;  // somme des quantités livrées

  // Montant total de la commande (API)
  montant_total?: number;

  reduction?: number;

  statut?: CommandeStatut;

  constructor() {
    this.numero = '';
    this.count = 0;
    this.contact_id = 0;
    this.lignes = [];
    this.livraisons = [];
    this.qte_total = 0;
    this.qte_livree = 0;
    this.montant_total = 0;
    this.reduction = 0;
       

  }
}

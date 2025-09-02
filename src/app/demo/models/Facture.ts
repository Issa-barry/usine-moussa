import { Commande } from "./commande.model";
import { Encaissement } from "./Encaissement";
import { FactureLigne } from "./FactureLigne";

 

export type FactureStatut = 'brouillon' | 'partiel' | 'payé' | 'impayé';

export class Facture {
  id?: number;
  numero?: string;
  // client_id: number;
   commande?: Commande;
  total: number;
  montant_du: number;
  statut?: FactureStatut;
  created_at?: string;
  updated_at?: string;
   
  lignes?: FactureLigne[];
  encaissements?: Encaissement[]; // déclaré ci-dessous via interface merging
  
  constructor() {
    this.lignes = [];
    this.encaissements = [];
    this.total = 0;
    this.montant_du = 0;
   }
}

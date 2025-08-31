import { Commande } from "./commande.model";
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

// Pour éviter les import circulaires, on déclare l'interface ici
export interface Encaissement {
  id: number;
  facture_id: number;
  montant: number;
  mode: 'espèces' | 'orange-money' | 'dépot-banque';
  reference?: string | null;
  commentaire?: string | null;
  date_encaissement: string; // ISO
  created_at?: string;
  updated_at?: string;
}

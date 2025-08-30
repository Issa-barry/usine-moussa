import { Commande } from "./commande.model";
import { FactureLigne } from "./FactureLigne";

 

export type FactureStatut = 'brouillon' | 'partiel' | 'payé' | 'impayé';

export interface Facture {
  id: number;
  numero: string;
  client_id: number;
  commande_id: number;
  total: number;
  montant_du: number;
  statut: FactureStatut;
  created_at?: string;
  updated_at?: string;

  // relations chargées par l’API (optionnelles)
  lignes?: FactureLigne[];
  encaissements?: Encaissement[]; // déclaré ci-dessous via interface merging
  client?: {
    id: number;
    name?: string;
    email?: string;
  };

  commande?: Commande;

  // commande?: {
  //   id: number;
  //   numero: string;
  //   statut: string; // 'brouillon' | 'livraison_en_cours' | 'livré' | 'cloturé' | 'annulé'
  // };
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

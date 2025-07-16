 
import { Commande } from './commande.model';
import { Contact } from './contact';
import { PackingLigne } from './packing-ligne.model';

export class Packing {
  id?: number;
  user_id!: number;
  date!: string;
  heure_debut!: string;
  heure_fin!: string;
  statut!: string;
  reference!: string;

  // Relations
  user?: Contact;
  lignes: PackingLigne[] = [];

  constructor(init?: Partial<Packing>) {
    Object.assign(this, init);
  }
}

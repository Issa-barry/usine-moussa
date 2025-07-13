
import { CommandeLigne } from './commande-ligne.model';
import { Contact } from './contact';
 

export interface Commande {
  id?: number;
  numero: string;
  contact_id: number;
  contact?: Contact;
  lignes: CommandeLigne[];
  created_at?: string;
  updated_at?: string;
}

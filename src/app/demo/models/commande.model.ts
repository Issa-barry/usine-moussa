
import { CommandeLigne } from './commande-ligne.model';
import { Contact } from './contact';
 

export class Commande {
  id?: number;
  numero: string;
  contact_id: number;
  contact?: Contact;
  lignes: CommandeLigne[];
  created_at?: string;
  updated_at?: string;
  qte_total: number;
  reduction:number;

  constructor(){
      this.numero = '';
      this.contact_id=0;
      this.lignes=[];
      this.qte_total=0;
      this.reduction=0;
  }
}

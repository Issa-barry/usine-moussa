export class Produit {
  id?: number;
  code?: string;
  nom: string;
  prix_vente: number;
  quantite_stock: number;
  categorie: string;
  prix_achat?: number;
  cout?: number;
  image?: string;
  created_at?: string;
  updated_at?: string;
  statut?:string;

  constructor()
      {
          this.nom = "";
          this.prix_vente = 0;
          this.quantite_stock = 0;
        this.categorie="";
          this.prix_achat = 0;
          this.cout = 0;
      }
  }  
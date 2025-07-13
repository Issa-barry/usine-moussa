import { Categorie } from "../enums/categorie.enum";

export class Produit {
  id?: number;
  code?: string;
  nom: string;
  prix_vente: number;
  quantite_stock: number;
  prix_achat?: number;
  cout?: number;
  image?: string;
  categorie: Categorie = Categorie.Vente;
 
  created_at?: string;
  updated_at?: string;
  statut?:string;
   imagePreview?: string;

  constructor()
      {
          this.nom = ""; 
          this.prix_vente = 0;
          this.quantite_stock = 0;
          this.image ="defaut1.png";
          this.prix_achat = 0;
          this.cout = 0;
      }
  }  
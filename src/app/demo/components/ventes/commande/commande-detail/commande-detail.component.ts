import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UpdateCommandeDto } from 'src/app/demo/models/commande-update.dto';
import { Commande } from 'src/app/demo/models/commande.model';
import { Contact } from 'src/app/demo/models/contact';
import { Produit } from 'src/app/demo/models/produit.model';
import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { ProduitService } from 'src/app/demo/service/produit/produit.service';
import { CommandeService } from 'src/app/demo/service/ventes/commande/commande.service';

@Component({
    selector: 'app-commande-detail',
    templateUrl: './commande-detail.component.html',
    styleUrl: './commande-detail.component.scss',
})
export class CommandeDetailComponent implements OnInit {
    titrePage: string = 'Détail de la commande';
    isEditMode = false;
    errorMessage: string = '';
    apiErrors: { [key: string]: string[] } = {};
    produits: Produit[] = [];
    contacts: Contact[] = [];
    commande: Commande = new Commande();
    numeroCommande: string = this.activatedRoute.snapshot.params['id'];

//update variable
lignes: {
        produit: Produit | null;
        quantite: number;
        prix_vente: number;
    }[] = [];
    reduction: number = 0;
  totalCommande: number = 0; 
  totalBrut: number = 0;
  selectedLivreur: Contact | null = null;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private commandeService: CommandeService,
        private produitService: ProduitService,
        private contactService: ContactService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        // this.loadProduits();
        // this.loadContacts();
        // this.ajouterLigne();
        this.loadCommande();
    }

  loadCommande(): void {
  this.commandeService.getCommandeByNumero(this.numeroCommande).subscribe({
    next: (res) => {
      this.commande = res;

      // Correction des types
      this.selectedLivreur = res.contact ?? null;
      this.reduction = res.reduction ?? 0;

      // Transformation des lignes
      this.lignes = res.lignes.map((l: any) => ({
        produit: l.produit,
        quantite: l.quantite,
        prix_vente: parseFloat(l.prix_vente)
      }));

      this.recalculerTotal();
    },
    error: (err) => {
      this.errorMessage = "Erreur lors du chargement de la commande.";
      console.error(err);
    }
  });
}


    // update
    
  ajouterLigne(): void {
    this.lignes.push({ produit: null, quantite: 1, prix_vente: 0 });
  }

  supprimerLigne(index: number): void {
    this.lignes.splice(index, 1);
    this.recalculerTotal();
  }

  onProduitChange(index: number): void {
    const produit = this.lignes[index].produit;
    if (produit && produit.prix_vente !== undefined) {
      this.lignes[index].prix_vente = produit.prix_vente;
    }
    this.recalculerTotal();
  }

  recalculerTotal(): void {
    const brut = this.lignes.reduce((total, ligne) => {
      const quantite = ligne.quantite || 0;
      const prix = ligne.prix_vente || 0;
      return total + quantite * prix;
    }, 0);
    this.totalBrut = brut;
    this.totalCommande = brut - this.reduction;
  }

  ///partie3
  editProduct(): void {
  this.isEditMode = true;
  this.titrePage = 'Modification de la commande : ' + this.commande.numero;
}
   
  cancelEdit(): void {
  this.isEditMode = false;
  this.loadCommande(); // recharge les données d'origine
  this.apiErrors = {};
  this.errorMessage = '';
}
//    saveCommande(): void {
//   // À implémenter selon ton service updateCommande()
//   this.messageService.add({
//     severity: 'success',
//     summary: 'Succès',
//     detail: 'Commande enregistrée avec succès.'
//   });

//   this.isEditMode = false;
//   this.loadCommande();
// }

saveCommande(): void {
  const payload: UpdateCommandeDto = {
    contact_id: this.commande.contact?.id!,
    reduction: this.reduction,
    lignes: this.lignes.map(ligne => ({
      produit_id: ligne.produit!.id!,
      quantite: ligne.quantite,
      prix_vente: ligne.prix_vente
    }))
  };

//   this.commandeService.updateCommande(this.commande.id, payload).subscribe({
//     next: () => {
//       this.messageService.add({
//         severity: 'success',
//         summary: 'Succès',
//         detail: 'Commande mise à jour avec succès.'
//       });
//       this.isEditMode = false;
//       this.loadCommande();
//     },
//     error: (err) => {
//       this.apiErrors = err.error?.data || {};
//       this.errorMessage = err.error?.message || 'Erreur lors de la mise à jour';
//     }
//   });
}

 confirmDelete(): void {
  this.confirmationService.confirm({
    message: 'Êtes-vous sûr de vouloir supprimer cette commande ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.commandeService.deleteCommande(this.commande.id!).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Commande supprimée avec succès.'
          });
          this.router.navigate(['/dashboard/ventes/commande']);
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'La suppression a échoué.'
          });
          console.error(err);
        }
      });
    }
  });
}


}

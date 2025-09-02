import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
 import { CommandeService } from 'src/app/demo/service/ventes/commande/commande.service';
import { Commande } from 'src/app/demo/models/commande.model';

@Component({
  selector: 'app-commande-liste',
  templateUrl: './commande-liste.component.html',
  styleUrl: './commande-liste.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class CommandeListeComponent implements OnInit {
    // iba
    commandes : Commande[] = [];
    selectedCommande: any = null;
commandeDetailDialog: boolean = false;
    loading = false;
     skeletonRows = Array.from({ length: 5 }, () => ({}));


    // autre
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20]; 

    constructor( 
        private router: Router, 
        private productService: ProductService, 
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private commandeService: CommandeService
    ) { }

    ngOnInit() {

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.getAllCommandes()
    }
//IBA

  getAllCommandes(): void {
    this.loading = true;
    this.commandeService.getAllCommandes().subscribe({
      next: (res) => {
        this.commandes = res;
        this.loading = false;  
        console.log(this.commandes);
        
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contacts:', err);
        this.loading = false;
      }
    });
  }

 viewCommande(commande: any) {
  this.selectedCommande = commande;
  this.commandeDetailDialog = true;
}

    hideDialog() {
        this.commandeDetailDialog = false;
    }
  

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

      onGoToNewCommande() {
        this.router.navigate(['/dashboard/ventes/commande/commande-new']);
    }
      onGoToDetailCommande(commande: Commande) {
        this.router.navigate(['/dashboard/ventes/commande/commande-detail', commande.numero]);
    }

    onGoToLivraisonDetail(commande: Commande): void {
  this.router.navigate(['/dashboard/stock/livraison/livraison-detail', commande.numero]);
}

    onGoToLivraisonNew(commande: Commande): void {
  this.router.navigate(['/dashboard/stock/livraison/livraison-new', commande.numero]);
}

  

  validerCommande(commande: Commande): void {

  this.confirmationService.confirm({
    message: 'Valider cette commande ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.commandeService.validerCommande(commande.numero).subscribe({
        next: (updatedCommande) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Commande validée avec succès.'
             
          });
           this.getAllCommandes()
          // Met à jour la commande localement
          // const index = this.commandes.findIndex(c => c.numero === updatedCommande.numero);
          // if (index !== -1) {
          //   this.commandes[index] = updatedCommande;
          // }
          this.commandeDetailDialog = false;
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.error?.message || 'Échec de la validation.'
          });
        }
      });
    }
  });
}


}

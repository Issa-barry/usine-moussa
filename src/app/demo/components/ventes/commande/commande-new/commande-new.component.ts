import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommandeService } from 'src/app/demo/service/ventes/commande/commande.service';
import { ProduitService } from 'src/app/demo/service/produit/produit.service';
import { Produit } from 'src/app/demo/models/produit.model';
import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { Contact } from 'src/app/demo/models/contact';

interface ClientOption {
    id: number;
    nom: string;
    telephone: string;
}

@Component({
    selector: 'app-commande-new',
    templateUrl: './commande-new.component.html',
    styleUrls: ['./commande-new.component.scss'],
    providers: [MessageService, ConfirmationService],
})
export class CommandeNewComponent implements OnInit {
      

    lignes: {
        produit: Produit | null;
        quantite: number;
        prix_vente: number;
    }[] = [];
    reduction: number = 0;
    totalCommande: number = 0;

    clients: ClientOption[] = [
        { id: 1, nom: 'Issa Barry', telephone: '+224 622 000 000' },
        { id: 2, nom: 'Aïssatou Diallo', telephone: '+224 622 111 111' },
        { id: 3, nom: 'Mohamed Camara', telephone: '+224 622 222 222' },
        { id: 4, nom: 'Fatoumata Bah', telephone: '+224 622 333 333' },
    ];

   selectedLivreur: Contact | null = null;
    produits: Produit[] = [];
    contacts: Contact[] = [];
    // loading = true;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private commandeService: CommandeService,
        private produitService: ProduitService,
        private contactService: ContactService,
    ) {}

    ngOnInit(): void {
        this.loadProduits();
        this.loadingContacts()
        this.ajouterLigne();
    }

      loadingContacts(): void {
    // this.loading = true;
    this.contactService.getContacts().subscribe({
      next: (res) => {
        this.contacts = res;
        // this.loading = false;
        console.log(this.contacts);
        
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des contacts:', err);
        // this.loading = false;
      }
    });
  }

    loadProduits(): void {
        this.produitService.getProduits().subscribe({
            next: (data) => {
                this.produits = data;
                console.log(this.produits);
                
            },
            error: (err) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: err.message,
                });
            },
        });
    }

    onGoToListeCommande(): void {
        this.router.navigate(['/dashboard/ventes/commande']);
    }

    ajouterLigne(): void {
        this.lignes.push({ produit: null, quantite: 1, prix_vente: 0 });
    }

    supprimerLigne(index: number): void {
        this.lignes.splice(index, 1);
        this.recalculerTotal();
    }

    recalculerTotal(): void {
        this.totalCommande = this.lignes.reduce((total, ligne) => {
            return total + (ligne.quantite * ligne.prix_vente || 0);
        }, 0);
    }

    onProduitChange(index: number): void {
        const produit = this.lignes[index].produit;
        if (produit) {
            // this.lignes[index].prix_vente = produit.prix || 0;
            this.recalculerTotal();
        }
    }

    onSubmit(): void {
        if (
            !this.selectedLivreur ||
            this.lignes.length === 0 ||
            this.lignes.some((l) => !l.produit)
        ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Champs requis',
                detail: 'Veuillez remplir tous les champs obligatoires.',
            });
            return;
        }

        // const lignesPayload = this.lignes.map(ligne => ({
        //   produit_id: ligne.produit!.id,
        //   quantite: ligne.quantite,
        //   prix_vente: ligne.prix_vente
        // }));

        // const payload = {
        //   contact_id: this.selectedClient.id,
        //   reduction: this.reduction,
        //   lignes: lignesPayload
        // };

        // this.commandeService.createCommande(payload).subscribe({
        //   next: () => {
        //     this.messageService.add({
        //       severity: 'success',
        //       summary: 'Succès',
        //       detail: 'Commande créée avec succès.'
        //     });
        //     this.router.navigate(['/dashboard/ventes/commande']);
        //   },
        //   error: (err) => {
        //     this.messageService.add({
        //       severity: 'error',
        //       summary: 'Erreur',
        //       detail: err.message
        //     });
        //   }
        // });
    }
}

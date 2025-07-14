import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommandeService } from 'src/app/demo/service/ventes/commande/commande.service';

interface ProduitOption {
  id: number;
  nom: string;
}

interface ClientOption {
  id: number;
  nom: string;
  telephone: string;
}

@Component({
  selector: 'app-commande-new',
  templateUrl: './commande-new.component.html',
  styleUrls: ['./commande-new.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CommandeNewComponent implements OnInit {
  selectedClient: ClientOption | null = null;
  lignes: {
    produit: ProduitOption | null;
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

  produits: ProduitOption[] = [
    { id: 7, nom: 'Eau Minérale 1L' },
    { id: 8, nom: 'Pack Jus de Bissap' },
    { id: 9, nom: 'Sac de Riz 25kg' },
    { id: 10, nom: 'Boîte de Sardine' },
  ];

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private commandeService: CommandeService
  ) {}

  ngOnInit(): void {
    this.ajouterLigne();
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

  onSubmit(): void {
    if (!this.selectedClient || this.lignes.length === 0 || this.lignes.some(l => !l.produit)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Champs requis',
        detail: 'Veuillez remplir tous les champs obligatoires.'
      });
      return;
    }

    const lignesPayload = this.lignes.map(ligne => ({
      produit_id: ligne.produit!.id,
      quantite: ligne.quantite,
      prix_vente: ligne.prix_vente
    }));

    const payload = {
      contact_id: this.selectedClient.id,
      reduction: this.reduction,
      lignes: lignesPayload
    };

    this.commandeService.createCommande(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Commande créée avec succès.'
        });
        this.router.navigate(['/dashboard/ventes/commande']);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.message
        });
      }
    });
  }
}
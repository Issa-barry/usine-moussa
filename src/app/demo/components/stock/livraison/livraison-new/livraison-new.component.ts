import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommandeService } from 'src/app/demo/service/ventes/commande/commande.service';
import { ProduitService } from 'src/app/demo/service/produit/produit.service';
import { LivraisonService } from 'src/app/demo/service/stock/livraison/livraison.service';
import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { Produit } from 'src/app/demo/models/produit.model';
import { Contact } from 'src/app/demo/models/contact';
import { Commande } from 'src/app/demo/models/commande.model';

@Component({
  selector: 'app-livraison-new',
  templateUrl: './livraison-new.component.html',
  styleUrls: ['./livraison-new.component.scss']
})
export class LivraisonNewComponent implements OnInit {
  lignes: {
    produit: Produit | null;
    quantite: number;
    prix_vente: number;
    quantiteRestante: number;
  }[] = [];

  totalCommande: number = 0;
  totalBrut: number = 0;
  commandeNumero: string = this.activatedRoute.snapshot.params['id'];

  selectedLivreur: Contact | null = null;
  selectedClient: Contact | null = null;

  produits: Produit[] = [];
  contacts: Contact[] = [];

  errorMessage: string = '';
  apiErrors: { [key: string]: string[] } = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private commandeService: CommandeService,
    private produitService: ProduitService,
    private livraisonService: LivraisonService,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadContacts();
    this.loadCommande();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: res => this.contacts = res,
      error: err => console.error('Erreur récupération contacts :', err)
    });
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: data => this.produits = data,
      error: err => this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: err.message
      })
    });
  }

  loadCommande(): void {
    this.commandeService.getCommandeByNumero(this.commandeNumero).subscribe({
      next: (commande: Commande) => {
        this.selectedLivreur = commande.contact ?? null;

        this.lignes = (commande.lignes ?? []).map(ligne => ({
          produit: ligne.produit ?? null,
          quantite: 0,
          quantiteRestante: ligne.quantite_restante ?? 0, // ✅ pris du backend
          prix_vente: ligne.prix_vente
        }));

        this.recalculerTotal();
      },
      error: err => {
        console.error('Erreur chargement commande :', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de charger la commande'
        });
      }
    });
  }

  onProduitChange(index: number): void {
    const produit = this.lignes[index].produit;
    if (produit?.prix_vente !== undefined) {
      this.lignes[index].prix_vente = produit.prix_vente;
    }
    this.recalculerTotal();
  }

  supprimerLigne(index: number): void {
    this.lignes.splice(index, 1);
    this.recalculerTotal();
  }

  recalculerTotal(): void {
    const brut = this.lignes.reduce((total, ligne) => {
      const qte = ligne.quantite || 0;
      const prix = ligne.prix_vente || 0;
      return total + qte * prix;
    }, 0);
    this.totalBrut = brut;
    this.totalCommande = brut;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.apiErrors = {};

    const lignesValides = this.lignes.filter(l =>
      l.produit !== null && l.quantite > 0 && l.quantite <= l.quantiteRestante
    );

    if (!this.selectedLivreur) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Livreur requis',
        detail: 'Veuillez sélectionner un livreur.'
      });
      return;
    }

    if (!this.selectedClient) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Client requis',
        detail: 'Veuillez sélectionner le client à livrer.'
      });
      return;
    }

    if (lignesValides.length === 0) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Produits requis',
        detail: 'Veuillez ajouter au moins un produit à livrer.'
      });
      return;
    }

    const payload = {
      commande_numero: this.commandeNumero,
      client_id: this.selectedClient!.id!,
      date_livraison: new Date().toISOString().slice(0, 10),
      produits: lignesValides.map(ligne => ({
        produit_id: ligne.produit!.id!,
        quantite: ligne.quantite
      }))
    };

    this.livraisonService.validerLivraison(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Livraison validée et facture générée.'
        });
        // this.router.navigate(['/dashboard/ventes/livraison']);
        this.loadCommande()
      },
      error: err => {
        console.error('Erreur validation livraison', err);
        this.errorMessage = err.message;
        this.apiErrors = err.validationErrors || {};
      }
    });
  }

  onGoToListeCommande(): void {
    this.router.navigate(['/dashboard/ventes/commande']);
  }
}

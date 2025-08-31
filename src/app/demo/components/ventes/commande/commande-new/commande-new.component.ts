import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommandeService, ApiErrorShape } from 'src/app/demo/service/ventes/commande/commande.service';
import { ProduitService } from 'src/app/demo/service/produit/produit.service';
import { Produit } from 'src/app/demo/models/produit.model';
import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { Contact } from 'src/app/demo/models/contact';
import { CreateCommandeDto } from 'src/app/demo/models/commande-create.dto';

@Component({
  selector: 'app-commande-new',
  templateUrl: './commande-new.component.html',
  styleUrls: ['./commande-new.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class CommandeNewComponent implements OnInit {
  lignes: { produit: Produit | null; quantite: number; prix_vente: number }[] = [];
  reduction = 0;
  totalCommande = 0;
  totalBrut = 0;
  selectedLivreur: Contact | null = null;

  produits: Produit[] = [];
  contacts: Contact[] = [];

  isSaving = false;

  errorMessage = '';
  apiErrors: { [key: string]: string[] } = {};

  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private commandeService: CommandeService,
    private produitService: ProduitService,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.loadContacts();
    this.ajouterLigne();
  }

  private resetErrors(): void {
    this.errorMessage = '';
    this.apiErrors = {};
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (res) => (this.contacts = res),
      error: (err: ApiErrorShape) => {
        this.errorMessage = err?.message || 'Erreur lors de la récupération des contacts.';
        this.messageService.add({ severity: 'error', summary: `Erreur ${err?.status ?? ''}`.trim(), detail: this.errorMessage });
      },
    });
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => (this.produits = data),
      error: (err: ApiErrorShape) => {
        this.errorMessage = err?.message || 'Erreur lors du chargement des produits.';
        this.messageService.add({ severity: 'error', summary: `Erreur ${err?.status ?? ''}`.trim(), detail: this.errorMessage });
      },
    });
  }

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
      this.lignes[index].prix_vente = Number(produit.prix_vente) || 0;
    }
    this.recalculerTotal();
  }

  recalculerTotal(): void {
    const brut = this.lignes.reduce((total, ligne) => {
      const quantite = Number(ligne.quantite) || 0;
      const prix = Number(ligne.prix_vente) || 0;
      return total + quantite * prix;
    }, 0);
    this.totalBrut = brut;
    this.totalCommande = brut - (Number(this.reduction) || 0);
  }

  onGoToListeCommande(): void {
    this.router.navigate(['/dashboard/ventes/commande']);
  }

  onSubmit(): void {
    this.resetErrors();

    // Pré-validation front
    const lignesValides = this.lignes.filter(l => l.produit !== null);
    if (!this.selectedLivreur) {
      this.apiErrors['contact_id'] = ['Le livreur est requis.'];
      this.messageService.add({ severity: 'warn', summary: 'Champs requis', detail: 'Veuillez sélectionner un livreur.' });
      return;
    }
    if (lignesValides.length === 0) {
      // on suppose qu’une ligne vide existe déjà (créée au ngOnInit)
      this.apiErrors['lignes.0.produit_id'] = ['Sélectionnez un produit.'];
      this.messageService.add({ severity: 'warn', summary: 'Champs requis', detail: 'Ajoutez au moins un produit.' });
      return;
    }

    const lignesPayload = lignesValides.map((ligne, i) => ({
      produit_id: ligne.produit!.id!,
      quantite: Number(ligne.quantite) || 0,
      prix_vente: Number(ligne.prix_vente) || 0,
    }));

    const payload: CreateCommandeDto = {
      contact_id: this.selectedLivreur!.id!,
      reduction: Number(this.reduction) || 0,
      lignes: lignesPayload,
    };

    this.isSaving = true;
    this.commandeService.createCommande(payload).subscribe({
      next: () => {
        this.isSaving = false;
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande créée avec succès.' });
        this.router.navigate(['/dashboard/ventes/commande']);
      },
      error: (err: ApiErrorShape) => {
        this.isSaving = false;

        // Erreurs validation (422)
        this.apiErrors = (err?.errors as any) || {};

        // Message global (ex: 500)
        this.errorMessage = err?.message || 'Données invalides';

        this.messageService.add({
          severity: 'error',
          summary: `Erreur ${err?.status ?? ''}`.trim(),
          detail: this.errorMessage,
        });

        console.error('Erreur création commande:', err);
      },
    });
  }

  // ------- Helpers erreurs pour le template -------
  getError(field: string, index?: number): string | null {
    const key = index !== undefined ? `lignes.${index}.${field}` : field;
    const msgs = this.apiErrors?.[key];
    return Array.isArray(msgs) && msgs.length ? msgs[0] : null;
  }
  hasError(field: string, index?: number): boolean {
    return !!this.getError(field, index);
  }
}

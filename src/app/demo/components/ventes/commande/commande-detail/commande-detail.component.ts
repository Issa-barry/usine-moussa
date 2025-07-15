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
  styleUrls: ['./commande-detail.component.scss']
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

  lignes: {
    produit: Produit | null;
    quantite: number;
    prix_vente: number;
  }[] = [];

  reduction: number = 0;
  totalCommande: number = 0;
  totalBrut: number = 0;

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
    this.loadProduits();
    this.loadContacts();
    this.loadCommande();
  }

  loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => this.produits = data,
      error: (err) => console.error('Erreur chargement produits:', err)
    });
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (data) => this.contacts = data,
      error: (err) => console.error('Erreur chargement contacts:', err)
    });
  }

  loadCommande(): void {
    this.commandeService.getCommandeByNumero(this.numeroCommande).subscribe({
      next: (res) => {
        this.commande = res;
        this.commande.contact = this.contacts.find(c => c.id === res.contact?.id);
        this.reduction = parseFloat(res.reduction as any) || 0;
        this.lignes = res.lignes.map((l: any) => ({
          produit: this.produits.find(p => p.id === l.produit?.id) || null,
          quantite: l.quantite,
          prix_vente: parseFloat(l.prix_vente)
        }));
        this.recalculerTotal();
        this.titrePage = `Détail de la commande : ${res.numero}`;
      },
      error: (err) => {
        this.errorMessage = "Erreur lors du chargement de la commande.";
        console.error(err);
      }
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
    if (produit?.prix_vente) {
      this.lignes[index].prix_vente = parseFloat(produit.prix_vente as any);
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

  editProduct(): void {
    this.isEditMode = true;
    this.titrePage = `Modification de la commande : ${this.commande.numero}`;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.loadCommande();
    this.apiErrors = {};
    this.errorMessage = '';
  }

  saveCommande(): void {
    const payload: UpdateCommandeDto = {
      contact_id: this.commande.contact?.id!,
      reduction: this.reduction,
      lignes: this.lignes.map(ligne => ({
        produit_id: ligne.produit?.id!,
        quantite: ligne.quantite,
        prix_vente: ligne.prix_vente
      }))
    };

    this.commandeService.updateCommande(this.commande.id!, payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Commande mise à jour avec succès.'
        });
        this.isEditMode = false;
        this.loadCommande();
      },
      error: (err: any) => {
        this.apiErrors = err.error?.data || {};
        this.errorMessage = err.error?.message || 'Erreur lors de la mise à jour';
      }
    });
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

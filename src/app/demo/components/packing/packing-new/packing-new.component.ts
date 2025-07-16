import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackingService } from 'src/app/demo/service/packing/packing.service';
import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { ProduitService } from 'src/app/demo/service/produit/produit.service';
import { Packing } from 'src/app/demo/models/packing.model';
import { Contact } from 'src/app/demo/models/contact';
import { Produit } from 'src/app/demo/models/produit.model';
import { PackingLigne } from 'src/app/demo/models/packing-ligne.model';

@Component({
  selector: 'app-packing-new',
  templateUrl: './packing-new.component.html',
  styleUrls: ['./packing-new.component.scss']
})
export class PackingNewComponent implements OnInit {
  packing: Packing = new Packing();
  statuts = [
    { label: 'En cours', value: 'en_cours' },
    { label: 'Terminé', value: 'termine' },
    { label: 'Annulé', value: 'annule' },
  ];
  contacts: Contact[] = [];
  produits: Produit[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private packingService: PackingService,
    private contactService: ContactService,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.packing.date = new Date().toISOString().substring(0, 10);
    this.packing.heure_debut = '08:00';
    this.packing.heure_fin = '17:00';
    this.packing.statut = 'en_cours';

    this.produitService.getProduits().subscribe({
      next: (data) => (this.produits = data),
      error: (err) => (this.errorMessage = err.message),
    });

    this.contactService.getContacts().subscribe({
      next: (data) => {
        this.contacts = data;
        if (this.contacts.length > 0) {
          this.packing.user_id = this.contacts[0].id ?? 0;
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.loading = false;
      }
    });
  }

  addLigne(): void {
    this.packing.lignes.push({
      produit_id: this.produits[0]?.id ?? 0,
      quantite_utilisee: 1,
      packing_id: 0
    });
  }

  removeLigne(index: number): void {
    this.packing.lignes.splice(index, 1);
  }

  onSubmit(): void {
    this.packingService.create(this.packing).subscribe({
      next: () => this.router.navigate(['/dashboard/packing']),
      error: (err) => (this.errorMessage = err.message)
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Produit } from 'src/app/demo/models/produit.model';
import { ProduitService } from 'src/app/demo/service/produit/produit.service';

@Component({
  selector: 'app-produit-liste',
  templateUrl: './produit-liste.component.html',
  styleUrls: ['./produit-liste.component.scss'],
})
export class ProduitListeComponent implements OnInit {
  produits: Produit[] = [];
  produit: Produit = new Produit();

  productDialog = false;
  submitted = false;

  sortOptions: SelectItem[] = [];
  sortOrder = 0;
  sortField = '';

  constructor(
    private router: Router,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.loadProduits();
    this.initSortOptions();
  }

  private loadProduits(): void {
    this.produitService.getProduits().subscribe({
      next: (data) => {
        this.produits = data;
        console.log('Produits chargés avec succès :', data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      },
    });
  }

  private initSortOptions(): void {
    this.sortOptions = [
      { label: 'Prix décroissant', value: '!prix_vente' },
      { label: 'Prix croissant', value: 'prix_vente' },
    ];
  }

  onSortChange(event: any): void {
    const value = event.value;
    this.sortOrder = value.startsWith('!') ? -1 : 1;
    this.sortField = value.replace('!', '');
  }

  onFilter(dv: DataView, event: Event): void {
    dv.filter((event.target as HTMLInputElement).value);
  }

  openNew(): void {
    this.produit = new Produit();
    this.submitted = false;
    this.productDialog = true;
  }

  goTonewProduit(): void {
    this.router.navigate(['/dashboard/stock/produit/produit-new']);
  }

  onGoToProductEdit(produit: Produit): void {
    this.router.navigate(['/stock/produit/produit-edit', produit.id]);
  }

  onGoProductDetail(produit: Produit): void {
    this.router.navigate(['/stock/produit', produit.id]);
  }
}

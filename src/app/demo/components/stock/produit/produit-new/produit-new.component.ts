import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProduitService } from 'src/app/demo/service/produit/produit.service';
import { Produit } from 'src/app/demo/models/produit.model';
import { Categorie } from 'src/app/demo/enums/categorie.enum';

@Component({
  selector: 'app-produit-new',
  templateUrl: './produit-new.component.html',
  styleUrls: ['./produit-new.component.scss'],
})
export class ProduitNewComponent {
  @ViewChildren('buttonEl') buttonEl!: QueryList<ElementRef>;

  produit: Produit = new Produit();
 submitted: boolean = false;
apiErrors: { [key: string]: string[] } = {};
errorMessage: string = '';

  uploadedFiles: any[] = [];
  categoryOptions = Object.values(Categorie);
  showRemove: boolean = false;

  constructor(
    private produitService: ProduitService,
    private router: Router
  ) {}

  onUpload(event: any) {
    for (let file of event.files) {
      this.produit.image = file.name;
    }
  }

  removeImage() {
    this.produit.image = '';
  }

 saveProduit() {
  this.submitted = true;
  this.apiErrors = {};
  this.errorMessage = '';

  this.produitService.createProduit(this.produit).subscribe({
    next: (res) => {
      console.log('Produit enregistré avec succès', res);
      this.router.navigate(['/dashboard/stock/produit/produit-liste']);
    },
    error: (err) => {
      console.log('Erreur lors de la création du produit', err.error.data);

      if (err.error && err.error.data) {
        this.apiErrors = err.error.data; // ✅ important : c'est `data` ici
      }

      this.errorMessage = err.error?.message || 'Une erreur est survenue.';
    },
  });
}



  onGoToProduits() {
    this.router.navigate(['/dashboard/stock/produit/produit-liste']);
  }
}

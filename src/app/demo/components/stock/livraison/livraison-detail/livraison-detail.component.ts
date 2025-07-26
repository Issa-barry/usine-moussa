import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Livraison } from 'src/app/demo/models/livraison.model';
import { LivraisonService } from 'src/app/demo/service/stock/livraison/livraison.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'app-livraison-detail',
    templateUrl: './livraison-detail.component.html',
    styleUrl: './livraison-detail.component.scss',
})
export class LivraisonDetailComponent implements OnInit {
     commandeNumero: string = this.activatedRoute.snapshot.params['id'];
    livraisons: Livraison[] = [];
    loading = false;
  errorMessage = '';

   constructor(
    private activatedRoute: ActivatedRoute,
    private livraisonService: LivraisonService
  ) {}

    ngOnInit() {
        this.loadLivraisons();
    }


    loadLivraisons() {
    this.loading = true;
    this.livraisonService.getLivraisonByCommandeNumero(this.commandeNumero).subscribe({
      next: (data) => {
        this.livraisons = data;
        this.loading = false;
        console.log(this.livraisons)
      },
      error: (error) => {
        this.errorMessage = error.message || 'Erreur de chargement.';
        this.loading = false;
      }
    });
  }

    // hfhfhfhf

    orders = [
        {
            orderNumber: '45123',
            orderDate: '7 February 2023',
            amount: '$123.00',
            products: [
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '7585 GNF',
                    deliveryDate: 'Delivered on 7 February 2023',
                    image: 'assets/demo/images/ecommerce/order-history/orderhistory-1.png',
                },
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '1500 GNF',
                    deliveryDate: 'Delivered on 7 February 2023',
                    image: 'assets/demo/images/ecommerce/order-history/orderhistory-2.png',
                },
            ],
        },
        {
            orderNumber: '45126',
            orderDate: '9 February 2023',
            amount: '2 5000 GNF',
            products: [
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '$80',
                    deliveryDate: 'Delivered on 9 February 2023',
                    image: 'assets/demo/images/ecommerce/order-history/orderhistory-4.png',
                },
            ],
        },
    ];
}

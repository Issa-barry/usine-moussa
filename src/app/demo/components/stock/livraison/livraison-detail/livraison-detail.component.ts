import { Component } from '@angular/core';

@Component({
  selector: 'app-livraison-detail',
  templateUrl: './livraison-detail.component.html',
  styleUrl: './livraison-detail.component.scss'
})
export class LivraisonDetailComponent {

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
                    image: 'assets/demo/images/ecommerce/order-history/orderhistory-1.png'
                },
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '1500 GNF',
                    deliveryDate: 'Delivered on 7 February 2023',
                    image: 'assets/demo/images/ecommerce/order-history/orderhistory-2.png'
                },
                
            ]
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
                    image: 'assets/demo/images/ecommerce/order-history/orderhistory-4.png'
                },
                
            ]
        }
    ];

}

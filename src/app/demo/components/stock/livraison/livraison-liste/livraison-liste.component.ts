import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Livraison } from 'src/app/demo/models/livraison.model';
import { LivraisonService } from 'src/app/demo/service/stock/livraison/livraison.service';
import { Router } from '@angular/router';

interface expandedRows {
    [key: string]: boolean;
}

@Component({
  selector: 'app-livraison-liste',
  templateUrl: './livraison-liste.component.html',
  styleUrl: './livraison-liste.component.scss',
    providers: [MessageService, ConfirmationService]
})
export class LivraisonListeComponent implements OnInit {

    customers1: Customer[] = [];

    customers2: Customer[] = [];

    customers3: Customer[] = [];

    selectedCustomers1: Customer[] = [];

    selectedCustomer: Customer = {};

    representatives: Representative[] = [];

    statuses: any[] = [];

    products: Product[] = [];

    rowGroupMetadata: any;

    expandedRows: expandedRows = {};

    activityValues: number[] = [0, 100];

    isExpanded: boolean = false;

    idFrozen: boolean = false;

    loading: boolean = true;

    @ViewChild('filter') filter!: ElementRef;

    // iba
     livraisons: Livraison[] = [];
  selectedLivraisons: Livraison[] = [];
  livraisonDialog: boolean = false;
  deleteDialog: boolean = false;
  deleteMultipleDialog: boolean = false;
  livraison: Livraison = new Livraison();
    submitted = false;
    selectedLivraison: any = null;
    livraisonDetailDialog: boolean = false;

    constructor(
        private customerService: CustomerService, 
        private productService: ProductService,
     private livraisonService: LivraisonService,
     private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router, 
) { }

    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
        this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
        this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' }
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' }
        ];

        // iba
        this.loadLivraisons();
    }
// iba
loadLivraisons(): void {
    this.livraisonService.getAll().subscribe({
      next: (data) => {
        this.livraisons = data;
        this.loading = false;
        console.log(this.livraisons);
        
      },
      error: (err) =>
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: err.message,
        }),
      complete: () => (this.loading = false),
    });
  }


 viewLivraison(livraison: any) {
  this.selectedLivraison = livraison;
  this.livraisonDetailDialog = true;
}

onGoToDetailLivraison(livraison: Livraison) {
            this.router.navigate(['/dashboard/stock/livraison/livraison-detail', livraison.reference]);

}
 
 
    // template

    onSort() {
        this.updateRowGroupMetaData();
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};

        if (this.customers3) {
            for (let i = 0; i < this.customers3.length; i++) {
                const rowData = this.customers3[i];
                const representativeName = rowData?.representative?.name || '';

                if (i === 0) {
                    this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
                }
                else {
                    const previousRowData = this.customers3[i - 1];
                    const previousRowGroup = previousRowData?.representative?.name;
                    if (representativeName === previousRowGroup) {
                        this.rowGroupMetadata[representativeName].size++;
                    }
                    else {
                        this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                    }
                }
            }
        }
    }

    expandAll() {
        if (!this.isExpanded) {
            this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    formatCurrency(value: number) {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    
}   
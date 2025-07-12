import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { CountryService } from 'src/app/demo/service/country.service';
 


@Component({
  selector: 'app-commande-detail',
  templateUrl: './commande-detail.component.html',
  styleUrl: './commande-detail.component.scss',
   providers: [MessageService, ConfirmationService]
})
export class CommandeDetailComponent implements OnInit {
   quantities: number[] = [1, 1, 1];
   titrePage: string = 'Détail de la commande: CO-01151';

    value: string = '';

    checked: boolean = true;

    checked2: boolean = true;

    // cities = [
    //     { name: 'USA / New York', code: 'NY' },
    //     { name: 'Italy / Rome', code: 'RM' },
    //     { name: 'United Kingdoom / London', code: 'LDN' },
    //     { name: 'Turkey / Istanbul', code: 'IST' },
    //     { name: 'France / Paris', code: 'PRS' }
    // ];

    selectedCity: string = '';

    // IBA
    

      constructor(
            private router: Router,
            private messageService: MessageService,
            private confirmationService: ConfirmationService,
            private countryService: CountryService
        ) {}

          onGoToListeCommande() {
        this.router.navigate(['/ventes']);
    }


    // iba
    
selectedClient: any = null;
selectedProduit: any = null;
selectedLivreur: any = null;
selectedDepot: any = null;

total: number = 0;
quantite: number = 1;

clients = [
    { nom: 'Issa Barry', telephone: '+224 622 000 000' },
    { nom: 'Aïssatou Diallo', telephone: '+224 622 111 111' },
    { nom: 'Mohamed Camara', telephone: '+224 622 222 222' },
    { nom: 'Fatoumata Bah', telephone: '+224 622 333 333' },
];

produits = [
    { nom: 'Eau Minérale 1L', reference: 'EAU-001' },
    { nom: 'Pack Jus de Bissap', reference: 'JUS-012' },
    { nom: 'Sac de Riz 25kg', reference: 'RIZ-025' },
    { nom: 'Boîte de Sardine', reference: 'SAR-003' },
];

livreurs = [
    { nom: 'Alpha Condé', telephone: '+224 622 444 444' },
    { nom: 'Mamadou Sylla', telephone: '+224 622 555 555' },
    { nom: 'Ibrahima Touré', telephone: '+224 622 666 666' },
];

depots = [
    { nom: 'Dépôt Matoto', telephone: '+224 622 777 777' },
    { nom: 'Dépôt Kipé', telephone: '+224 622 888 888' },
    { nom: 'Dépôt Enco5', telephone: '+224 622 999 999' },
];

    isEditMode: boolean = false;
    //  editProduct(product: Product) {
//     this.product = { ...product };
//     this.isEditMode = true;
//     this.productDialog = true;
// }

 editProduct() {
    this.isEditMode = true;
   this.titrePage = 'Modifier cette commande : CO-01151'; 
   }

   saveCommande() {

        // Logique pour sauvegarder la commande
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande enregistrée avec succès !' });
        this.isEditMode = false;
        this.titrePage = 'Modifier cette commande : CO-01151';

   }
   
   cancelEdit() {
    this.isEditMode = false;
    this.titrePage = 'Modifier cette commande : CO-01151';
    this.selectedClient = null;
    this.selectedProduit = null;
    this.selectedLivreur = null;
    this.selectedDepot = null;
    this.quantite = 1;
    this.total = 0;
    this.messageService.add({ severity: 'info', summary: 'Annulation', detail: 'Édition annulée.' });
   }
   confirmDelete() {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer cette commande ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            // Logique pour supprimer la commande
            this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Commande supprimée avec succès !' });
            this.router.navigate(['/ventes']);
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Annulation', detail: 'Suppression annulée.' });
        }
    });
   }

   
// multiselection : 
countries: any[] = [];

    filteredCountries: any[] = [];

    selectedCountryAdvanced: any[] = [];

    valSlider = 50;

    valColor = '#424242';

    valRadio: string = '';

    valCheck: string[] = [];

    valCheck2: boolean = false;

    valSwitch: boolean = false;

    cities: SelectItem[] = [];

    selectedList: SelectItem = { value: '' };

    selectedDrop: SelectItem = { value: '' };

    selectedMulti: any[] = [];

    valToggle = false;

    paymentOptions: any[] = [];

    valSelect1: string = "";

    valSelect2: string = "";

    valueKnob = 20;

   

    ngOnInit() {
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

        this.cities = [
            { label: 'Pack 5', value: { id: 1, name: 'New York', code: 'NY' } },
            { label: 'Pack 10', value: { id: 2, name: 'Rome', code: 'RM' } },
            { label: 'Pack 20', value: { id: 3, name: 'London', code: 'LDN' } },
            { label: 'Rouleau sachet', value: { id: 4, name: 'Istanbul', code: 'IST' } },
            { label: 'Emballage', value: { id: 5, name: 'Paris', code: 'PRS' } }
        ];

        this.paymentOptions = [
            { name: 'Option 1', value: 1 },
            { name: 'Option 2', value: 2 },
            { name: 'Option 3', value: 3 }
        ];
    }

    filterCountry(event: any) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        } 

        this.filteredCountries = filtered;
    }
}

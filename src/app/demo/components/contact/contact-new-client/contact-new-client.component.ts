import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Civilite } from 'src/app/demo/enums/civilite.enum';
import { TypeClientEnum } from 'src/app/demo/enums/typeClient.enum';
import { VehiculeEnum } from 'src/app/demo/enums/vehicule.enum';
import { Contact } from 'src/app/demo/models/contact';
import { Role } from 'src/app/demo/models/Role';
import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { RoleService } from 'src/app/demo/service/role/role.service';

@Component({
  selector: 'app-contact-new-client',
  templateUrl: './contact-new-client.component.html',
  styleUrl: './contact-new-client.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ContactNewClientComponent implements OnInit {
    countries: any[] = [];
    submitted: boolean = false;
    contact: Contact = new Contact();
    roles: Role[] = [];
    errors: { [key: string]: string } = {};
    isGuineeSelected: boolean = false;
    loading = false; 
   
    constructor(
        private router: Router,
        private contactService: ContactService,
        private roleService: RoleService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit() {
        this.countries = [
            { name: 'GUINEE-CONAKRY', code: 'GN', value: 'GUINEE-CONAKRY' },
            { name: 'France', code: 'FR', value: 'FRANCE' },
        ];
        this.getAllRoles();
    }

    /**************************
     * ROLE
     **************************/
    getAllRoles(): void {

        this.roleService.getRoles().subscribe({
            next: (response) => {
                this.roles = response;
            },
        });
    }

    //Civilité :  Convertir l'énumération en tableau d'options
    civiliteOptions = Object.values(Civilite).map((civ) => ({
        label: civ,
        value: civ,
    }));

     clientOptions = [
  { label: 'Spécifique', value: TypeClientEnum.Specifique },
  { label: 'Véhicule',   value: TypeClientEnum.Vehicule },
];

        vehiculeOptions = Object.values(VehiculeEnum).map((vehicule) => ({
        label: vehicule,
        value: vehicule,
    }));

    onTypeClientChange(val: TypeClientEnum) {
  if (val !== TypeClientEnum.Vehicule) {
    this.contact.type_vehicule = null;
  }
}

    // iba


    saveClient() {
        this.submitted = true;
        this.errors = {};

        if (
            !this.contact.nom_complet ||
            !this.contact.phone  
         ) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Veuillez remplir tous les champs obligatoires.',
                life: 3000,
            });
            return; 
        } 

        const clientPayload = {
        nom_complet: this.contact.nom_complet,
        phone: this.contact.phone
    };

         console.log(this.contact)
         
        this.contactService.createClient(clientPayload).subscribe({
            next: () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Succès',
                    detail: 'Contact créé avec succès',
                    life: 3000,
                });

                this.contact = new Contact();
                this.submitted = false;
                this.errors = {};
                 
                // this.router.navigate(['/dashboard/contact']);
            },
            error: (err) => {
                console.error('Erreur lors de la création du contact:', err);

                if (err.error && err.error.errors) {
                    this.errors = err.error.errors;
                }
 
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Création du contact échouée. Vérifiez les champs.',
                    life: 5000,
                });
            },
        }); 
    }

    
}
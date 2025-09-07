import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';

import { Civilite } from 'src/app/demo/enums/civilite.enum';
import { Contact } from 'src/app/demo/models/contact';
import { Role } from 'src/app/demo/models/Role';
import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { RoleService } from 'src/app/demo/service/role/role.service';

@Component({
  selector: 'app-contact-new',
  standalone: false,
  templateUrl: './contact-new.component.html',
  styleUrl: './contact-new.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ContactNewComponent implements OnInit {
  countries: any[] = [];
  submitted = false;
  contact: Contact = new Contact();
  roles: Role[] = [];
  errors: { [key: string]: string } = {};
  isGuineeSelected = false;
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
      { name: 'France',         code: 'FR', value: 'FRANCE' },
    ];

    // S'assurer que l'objet existe
    this.contact.adresse = this.contact.adresse ?? {
      pays: '',
      adresse: '',
      complement_adresse: '',
      ville: '',
      quartier: '',
      code_postal: '',
      region: '',
    };

    // Pré-sélection par défaut
    this.contact.adresse.pays = this.countries[0].value; // 'GUINEE-CONAKRY'
    this.isGuineeSelected = true;

    this.getAllRoles();
  }

  /**************************
   * ROLE
   **************************/
  getAllRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (response) => {
        // Exclure le rôle client
        this.roles = response.filter((role: Role) => role.name.toLowerCase() !== 'client');
      },
    });
  }

  // Civilité : options
  civiliteOptions = Object.values(Civilite).map((civ) => ({
    label: civ,
    value: civ,
  }));

  onCountryChange(event: any) {
    const selectedCountry = event.value;

    if (selectedCountry && selectedCountry === 'GUINEE-CONAKRY') {
      this.isGuineeSelected = true;
      this.contact.adresse.code_postal = '00224';
    } else {
      this.isGuineeSelected = false;
      this.contact.adresse.ville = '';
      this.contact.adresse.quartier = '';
      this.contact.adresse.code_postal = '';
    }
  }

  saveContact() {
    this.submitted = true;
    this.errors = {};

    const isGuinee = this.isGuineeSelected;

    if (
      !this.contact.role_name ||
      !this.contact.civilite ||
      !this.contact.nom_complet ||
      !this.contact.email ||
      !this.contact.phone ||
      !this.contact.password ||
      !this.contact.password_confirmation ||
      !this.contact.adresse?.pays
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Attention',
        detail: 'Veuillez remplir tous les champs obligatoires.',
        life: 3000,
      });
      return;
    }

    // Normalisation simple
    this.contact.adresse.pays = String(this.contact.adresse.pays);
    if (!isGuinee && this.contact.adresse.code_postal) {
      this.contact.adresse.code_postal = String(this.contact.adresse.code_postal);
    }

    this.loading = true; // démarre le spinner du bouton

    this.contactService.createEmploye(this.contact)
      .pipe(finalize(() => this.loading = false)) // stoppe toujours le spinner
      .subscribe({
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

          this.router.navigate(['/dashboard/contact']);
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

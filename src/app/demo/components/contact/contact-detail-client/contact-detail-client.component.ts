import {
  Component, Input, OnInit, OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Civilite } from 'src/app/demo/enums/civilite.enum';
import { Contact } from 'src/app/demo/models/contact';
import { Role } from 'src/app/demo/models/Role';

import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { RoleService } from 'src/app/demo/service/role/role.service';

@Component({ 
  selector: 'app-contact-detail-client',
  templateUrl: './contact-detail-client.component.html',
  styleUrl: './contact-detail-client.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ContactDetailClientComponent implements OnInit, OnDestroy {
  @Input() contact: Contact = new Contact();
  @Input() role: Role = new Role();

  roles: Role[] = [];

  id: number = this.activatedRoute.snapshot.params['id'];

  isEditing = false;
  submitted = false;
  isGuineeSelected = false;

  loading = false;
  loadingContact = false;

  errorMessage: string | null = null;
  errors: { [key: string]: string } = {};
  private subscriptions = new Subscription();

  readonly GUINEE = 'GUINEE-CONAKRY';
  readonly adresseCache = { ville: '', pays: '', code_postal: '', adresse: '', quartier: '' };

  readonly countries = [
    { name: this.GUINEE, code: 'GN' },
    { name: 'France', code: 'FR' }
  ];

  readonly civiliteOptions = Object.values(Civilite).map(c => ({ label: c, value: c }));

  constructor(
    private contactService: ContactService,
    private roleService: RoleService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllRoles();
    this.loadContact();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAllRoles(): void {
    const sub = this.roleService.getRoles().subscribe({
      next: roles => this.roles = roles,
      error: () => {}
    });
    this.subscriptions.add(sub);
  }

  getRoleById(id: number): void {
    const sub = this.roleService.getRoleById(id).subscribe({
      next: role => this.contact.role = this.roles.find(r => r.id === role.id) ?? role,
      error: err => console.error('Erreur récupération rôle :', err)
    });
    this.subscriptions.add(sub);
  }

  loadContact(): void {
    this.loadingContact = true;
    const sub = this.contactService.getContactById(this.id).subscribe({
      next: resp => {
        this.contact = resp;
        this.initAdresse();
        if (this.contact.role_id) this.getRoleById(this.contact.role_id);
      },
      error: err => console.error('Erreur récupération contact :', err),
      complete: () => this.loadingContact = false
    });
    this.subscriptions.add(sub);
  }

  private initAdresse(): void {
    if (!this.contact.adresse) {
      this.contact.adresse = {
        pays: '', ville: '', code_postal: '', adresse: '',
        quartier: '', complement_adresse: '', region: ''
      };
    }
    const pays = this.contact.adresse.pays?.trim().toLowerCase();
    this.isGuineeSelected = pays === this.GUINEE.toLowerCase();
    Object.assign(this.adresseCache, this.contact.adresse);
  }

  toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  onCountryChange(event: { value: string }): void {
    const pays = event.value;
    this.isGuineeSelected = pays.toLowerCase() === this.GUINEE.toLowerCase();
    this.isGuineeSelected
      ? this.setAddressData(pays, '00224', this.GUINEE)
      : this.restorePreviousAddress(pays);
  }

  private setAddressData(pays: string, code_postal: string, adresse: string): void {
    Object.assign(this.contact.adresse, { pays, code_postal, adresse });
  }

  private restorePreviousAddress(pays: string): void {
    if (this.adresseCache.pays === 'France') {
      Object.assign(this.contact.adresse, this.adresseCache);
    } else {
      this.contact.adresse = {
        pays, ville: '', adresse: '', code_postal: '',
        quartier: '', complement_adresse: '', region: ''
      };
    }
  }

  saveClient(): void {
    this.submitted = true;
    this.errors = {};

    if (!this.contact.nom_complet || !this.contact.phone) {
      return this.showWarn('Veuillez remplir tous les champs obligatoires.');
    }

    const payload = {
      nom_complet: this.contact.nom_complet,
      phone: this.contact.phone
    };

    this.contactService.createClient(payload).subscribe({
      next: () => {
        this.showSuccess('Contact créé avec succès');
        this.contact = new Contact();
        this.submitted = false;
        this.errors = {};
        this.loadContact();
      },
      error: (err) => {
        console.error('Erreur lors de la création du contact:', err);
        if (err.error?.errors) this.errors = err.error.errors;
        this.showError('Création du contact échouée. Vérifiez les champs.');
      }
    });
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail, life: 3000 });
  }

  private showSuccess(msg: string): void {
    this.showMessage('success', 'Succès', msg);
  }

  private showError(msg: string): void {
    this.showMessage('error', 'Erreur', msg);
  }

  private showWarn(msg: string): void {
    this.showMessage('warn', 'Attention', msg);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Facture } from 'src/app/demo/models/Facture';
import { FactureLigne } from 'src/app/demo/models/FactureLigne';
import { FactureService } from 'src/app/demo/service/comptabilite/facturation/facturation.service';

import { Encaissement, EncaissementMode, CreateEncaissementDto } from 'src/app/demo/models/Encaissement';
import { EncaissementService } from 'src/app/demo/service/comptabilite/encaissement/encaissement.service';

@Component({
  selector: 'app-facturation-detail',
  templateUrl: './facturation-detail.component.html',
  styleUrl: './facturation-detail.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class FacturationDetailComponent implements OnInit {
  @Input() facture: Facture = new Facture();
  id: number = this.activatedRoute.snapshot.params['id'];

    errorMessage = '';
  apiErrors: { [key: string]: string[] } = {};


  encaissementDialog = false;
  submitted = false;
  isSaving = false;

  encaissement: Encaissement = new Encaissement();
  postErrors: Record<string, string[]> = {};

  modes: { label: string; value: EncaissementMode }[] = [
    { label: 'Espèces', value: 'espèces' },
    { label: 'Orange Money', value: 'orange-money' },
    { label: 'Dépôt banque', value: 'dépot-banque' },
  ];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private factureService: FactureService,
    private encaissementService: EncaissementService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFacture(this.id);
  }

  loadFacture(id: number): void {
    this.factureService.getFactureById(id).subscribe({
      next: (facture) => (this.facture = facture),
      error: (err) => {
        const msg = err?.message || err?.error?.message || 'Erreur lors du chargement de la facture';
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: msg });
      },
    });
  }

  // --- Helpers d’affichage
  lignesFacture(): FactureLigne[] {
    return (this.facture?.lignes as FactureLigne[]) ?? [];
  }

  libelleLigne(l: any): string {
    if (l?.produit?.nom) return l.produit.nom;
    if (l?.produit_id) return `Produit #${l.produit_id}`;
    return 'Produit';
  }

  encaisseLigne(l: any): number {
    return Number(l?.montant_encaisse ?? 0);
  }

  resteLigne(l: any): number {
    const ttc = Number(l?.montant_ttc ?? 0);
    const enc = this.encaisseLigne(l);
    return Math.max(0, ttc - enc);
  }

  totalTtcFacture(): number {
    const t = (this.facture as any)?.total_ttc;
    return t != null ? Number(t) : Number(this.facture.total ?? 0);
  }

  montantEncaisseTotal(): number {
    const m = (this.facture as any)?.montant_encaisse_total;
    if (m != null) return Number(m);
    return Number(this.facture.encaissements?.reduce((s, e) => s + (Number(e.montant) || 0), 0) ?? 0);
  }

  resteAPayerFacture(): number {
    const r = (this.facture as any)?.reste_a_payer;
    if (r != null) return Number(r);
    return Number(this.facture.montant_du ?? 0);
  }

  get canEncaisser(): boolean {
    return this.resteAPayerFacture() > 0 && (this.facture?.statut ?? '') !== 'payé';
  }

  // --- Encaissement (UI)
  openEncaissement(): void {
    if (!this.canEncaisser) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Non disponible',
        detail: "La facture est déjà soldée (payée) ou non encaissable.",
      });
      return;
    }
    this.submitted = false;
    this.postErrors = {};
    this.encaissement = new Encaissement();
    this.encaissement.facture_id = this.facture.id!;
    this.encaissement.mode_paiement = 'espèces'; // défaut
    this.encaissement.montant = Math.max(0, this.resteAPayerFacture());
    this.encaissement.date_encaissement = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    this.encaissementDialog = true;
  }

  hideDialog(): void {
    this.encaissementDialog = false;
    this.submitted = false;
    this.postErrors = {};
  }

   saveEncaissement(): void {
      this.submitted = true;
      this.postErrors = {}; 

         this.encaissementService.create(this.encaissement).subscribe({
      next: (res) => {
        this.isSaving = false;
        const msg = (res as any)?.message || 'Encaissement enregistré.';
        this.messageService.add({ severity: 'success', summary: 'Succès', detail: msg });
        this.encaissementDialog = false;
        this.loadFacture(this.id);
      },
      error: (err) => {
        this.errorMessage = err?.message; 
        console.log(this.errorMessage);
        
        this.isSaving = false;
        const msg = err?.message || err?.error?.message || "Erreur lors de l'encaissement.";
        this.postErrors = err?.errors || err?.error?.data || {};
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: msg });
       
        
      },
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

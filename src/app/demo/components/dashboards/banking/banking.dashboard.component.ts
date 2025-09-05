import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { MessageService } from 'primeng/api';

import { Contact } from 'src/app/demo/models/contact';
import { ContactService } from 'src/app/demo/service/contact/contact.service';
import { TransfertService } from 'src/app/demo/service/transfert/transfert.service';

import { EncaissementService } from 'src/app/demo/service/comptabilite/encaissement/encaissement.service';
import { CommandeService } from 'src/app/demo/service/ventes/commande/commande.service';

// ✅ Types
import { EncaissementStatsType } from 'src/app/demo/components/types/EncaissementStats.type';
import { PERIODES, Periode, PERIODE_LABELS } from 'src/app/demo/components/types/periode.type';
import { CommandeStatsType } from 'src/app/demo/components/types/CommandeStats.type';

interface MonthlyPayment {
  name?: string;
  amount?: number;
  paid?: boolean;
  date?: string;
}

/** Sévérités PrimeNG (union inline, pas d'import) */
type TagSeverity = 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast';

/** Ligne prête pour l'UI des commandes */
type CommandeRow = {
  statut: string;               // valeur brute renvoyée par le back
  label: string;                // libellé final (avec accents)
  severity: TagSeverity;        // couleur p-tag
  nombre: number;
  montant: number | null;
  date: string | null;
};

@Component({
  templateUrl: './banking.dashboard.component.html',
  providers: [MessageService],
})
export class BankingDashboardComponent implements OnInit, OnDestroy {
  // --------- UI / Charts ----------
  chartData: any;
  chartOptions: any;

  payments: MonthlyPayment[] = [];

  // --------- Etat global ----------
  subscription: Subscription;
  errors: { [key: string]: string } = {};
  contact: Contact = new Contact();

  // --------- Stats Transferts ----------
  stats = {
    total_envoye: 0,
    total_recu: 0,
    total_general: 0,
    nb_transferts: 0,
  };

  // --------- Stats Encaissements ----------
  encStats?: EncaissementStatsType;
  encLoading = false;
  encError = '';

  // --------- Stats Commandes ----------
  cmdStats?: CommandeStatsType;
  cmdLoading = false;
  cmdError = '';

  // --------- Périodes ----------
  periodes = PERIODES;
  periode: Periode = 'aujourdhui';        // encaissements
  cmdPeriode: Periode = 'cette_semaine';  // commandes
  periodeLabel = PERIODE_LABELS;
  cmdPeriodeOptions = PERIODES.map((p) => ({ label: PERIODE_LABELS[p], value: p }));

  constructor(
    private layoutService: LayoutService,
    private contactService: ContactService,
    private messageService: MessageService,
    private transfertService: TransfertService,
    private encaissementService: EncaissementService,
    private commandeService: CommandeService
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe(() => this.initChart());
  }

  // -------------------- Lifecycle --------------------
  ngOnInit() {
    this.loadEncaissementStats();  // période par défaut
    this.loadCommandeStats();      // période par défaut

    this.initChart();

    this.payments = [
      { name: 'Electric Bill', amount: 75.6, paid: true, date: '06/04/2022' },
      { name: 'Water Bill', amount: 45.5, paid: true, date: '07/04/2022' },
      { name: 'Gas Bill', amount: 45.2, paid: false, date: '12/04/2022' },
      { name: 'Internet Bill', amount: 25.9, paid: true, date: '17/04/2022' },
      { name: 'Streaming', amount: 40.9, paid: false, date: '20/04/2022' },
    ];
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  // -------------------- Encaissements --------------------
  onGlobalPeriodeChange(p: Periode) {
  this.periode = p;        // utilisé par encaissements
  this.cmdPeriode = p;     // synchronise commandes
  this.loadEncaissementStats();
  this.loadCommandeStats();
}

  onPeriodeChange(p: Periode) {
    this.periode = p;
    this.loadEncaissementStats();
    this.loadCommandeStats(); // rafraîchir les deux panneaux
  }

  loadEncaissementStats(): void {
    this.encLoading = true;
    this.encError = '';

    this.encaissementService.getStats({ periode: this.periode }).subscribe({
      next: (data) => {
        this.encStats = data;
        this.encLoading = false;
      },
      error: (err) => {
        this.encLoading = false;
        this.encError = err?.message || 'Erreur lors du chargement des encaissements.';
        this.messageService.add({ severity: 'error', summary: 'Encaissements', detail: this.encError });
      },
    });
  }

  get encCash(): number { return this.encStats?.encaissements.cash ?? 0; }
  get encOM(): number { return this.encStats?.encaissements.orange_money ?? 0; }
  get encDepot(): number { return this.encStats?.encaissements.depot_banque ?? 0; }
  get encTotal(): number { return this.encStats?.encaissements.total ?? 0; }

  // -------------------- Commandes --------------------
  loadCommandeStats() {
    this.cmdLoading = true;
    this.cmdError = '';
    this.commandeService.getStats({ periode: this.cmdPeriode }).subscribe({
      next: (d) => {
        this.cmdStats = d;
        this.cmdLoading = false;
      },
      error: (err) => {
        this.cmdError = err?.message || 'Erreur lors du chargement des commandes.';
        this.cmdLoading = false;
        this.messageService.add({ severity: 'error', summary: 'Commandes', detail: this.cmdError });
      },
    });
  }

  // --- Statuts: normalisation + mapping (accents/underscores pris en charge) ---
  /** Normalise la clé de statut provenant du back (minuscule, sans accents, '_' normalisés). */
  private normalizeStatut(key: string): string {
    return (key ?? '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // supprime diacritiques
      .toLowerCase()
      .replace(/[\s-]+/g, '_')
      .replace(/_+/g, '_')
      .trim();
  }

  /** Ordre d'affichage conseillé (clés normalisées). */
  private readonly ORDERED_KEYS = [
    'brouillon',
    'livraison_en_cours',
    'livre',
    'cloture',
    'annule',
  ] as const;

  /** Libellés officiels (avec accents) — indexés par clé normalisée */
  private readonly KNOWN_LABEL: Record<string, string> = {
    brouillon:           'Brouillon',
    annule:              'Annulée',
    livraison_en_cours:  'En cours de livraison',
    livre:               'Livrée',
    cloture:             'Clôturée',
  };

  /** Sévérités PrimeNG — indexées par clé normalisée */
  private readonly KNOWN_SEVERITY: Record<string, TagSeverity> = {
    brouillon:           'warning',
    annule:              'danger',
    livraison_en_cours:  'info',
    livre:               'success',
    cloture:             'secondary',
  };

  /** Label UI final (utilise les libellés officiels, sinon fallback Title Case). */
  private toLabel(statut: string): string {
    const k = this.normalizeStatut(statut);
    if (this.KNOWN_LABEL[k]) return this.KNOWN_LABEL[k];

    // Fallback: "foo_bar" -> "Foo Bar"
    const pretty = (statut || '').replace(/_/g, ' ').trim();
    return pretty
      .split(' ')
      .map(w => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
      .join(' ');
  }

  /** Couleur PrimeNG (mapping connu + heuristiques si statut inconnu). */
  private getSeverity(statut: string): TagSeverity {
    const k = this.normalizeStatut(statut);
    if (this.KNOWN_SEVERITY[k]) return this.KNOWN_SEVERITY[k];

    // heuristiques génériques
    if (k.includes('annul')) return 'danger';
    if (k.includes('brouillon') || k.includes('draft')) return 'warning';
    if (k.includes('factur') || k.includes('en_cours') || k.includes('pending') || k.includes('process')) return 'info';
    if (k.includes('livre') || k.includes('paye') || k.includes('regle') || k.includes('complete') || k.includes('done')) return 'success';
    if (k.includes('clot') || k.includes('cloturé') || k.includes('close') || k.includes('archive')) return 'secondary';

    return 'secondary';
  }

  /** Liste prête pour *ngFor */
  get commandesList(): CommandeRow[] {
    const parStatut = this.cmdStats?.commandes?.par_statut;
    if (!parStatut) return [];

    const rows = Object.entries(parStatut).map(([rawKey, infos]: [string, any]): CommandeRow => {
      return {
        statut: rawKey,
        label: this.toLabel(rawKey),
        severity: this.getSeverity(rawKey),
        nombre: infos?.count ?? 0,
        montant: infos?.montant ?? null,
        date: this.cmdStats?.range?.to ?? this.cmdStats?.range?.from ?? null,
      };
    });

    // Tri selon l'ordre conseillé, sinon ordre alpha par label
    return rows.sort((a, b) => {
      const ia = this.ORDERED_KEYS.indexOf(this.normalizeStatut(a.statut) as any);
      const ib = this.ORDERED_KEYS.indexOf(this.normalizeStatut(b.statut) as any);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.label.localeCompare(b.label);
    });
  }

  /** Optimisation rendu table */
  trackByStatut = (_: number, row: CommandeRow) => this.normalizeStatut(row.statut);

  // -------------------- Chart --------------------
  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Income',
          data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
          fill: false,
          tension: 0.4,
          borderColor: documentStyle.getPropertyValue('--green-500'),
        },
        {
          label: 'Expenses',
          data: [1200, 5100, 6200, 3300, 2100, 6200, 4500],
          fill: true,
          borderColor: '#6366f1',
          tension: 0.4,
          backgroundColor: 'rgba(99,102,220,0.2)',
        },
      ],
    };

    this.chartOptions = {
      animation: { duration: 0 },
      plugins: {
        legend: { labels: { color: textColor } },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } },
        y: { ticks: { color: textColorSecondary }, grid: { color: surfaceBorder } },
      },
    };
  }
}

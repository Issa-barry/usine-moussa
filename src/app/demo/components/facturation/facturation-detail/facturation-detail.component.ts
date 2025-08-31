import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Facture } from 'src/app/demo/models/Facture';
import { FactureService } from 'src/app/demo/service/comptabilite/facturation/facturation.service';

@Component({
  selector: 'app-facturation-detail',
  // standalone: true,
  // imports: [],
  templateUrl: './facturation-detail.component.html',
  styleUrl: './facturation-detail.component.scss',
   providers: [MessageService, ConfirmationService],
})
export class FacturationDetailComponent implements OnInit {
  @Input() facture: Facture = new Facture();
  id: number = this.activatedRoute.snapshot.params['id'];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private factureService: FactureService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit(): void {
     this.loadFacture(this.id);
  }

  loadFacture(id: number): void {
    this.factureService.getFactureById(id).subscribe({
      next: (facture) => {
        this.facture = facture;
        console.log(facture);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors du chargement de la facture' });
      }
    });
  }
}

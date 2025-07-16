import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Packing } from 'src/app/demo/models/packing.model';
import { PackingService } from 'src/app/demo/service/packing/packing.service';

@Component({
  selector: 'app-packing-detail',
  templateUrl: './packing-detail.component.html',
  styleUrl: './packing-detail.component.scss'
})
export class PackingDetailComponent implements OnInit {
  packing?: Packing;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private packingService: PackingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.packingService.getById(+id).subscribe({
        next: (data) => {
          this.packing = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.message || 'Erreur lors du chargement';
          this.loading = false;
        }
      });
    }
  }
}
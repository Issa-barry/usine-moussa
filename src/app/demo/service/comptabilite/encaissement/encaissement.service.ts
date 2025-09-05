import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environements/environment.dev';
import { CreateEncaissementDto, Encaissement, EncaissementMode } from 'src/app/demo/models/Encaissement';
import { EncaissementStatsQueryType, EncaissementStatsType } from 'src/app/demo/components/types/EncaissementStats.type';

type ApiSuccess<T> = { success: boolean; data: T };

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

type ApiErrors = { [key: string]: string[] };

@Injectable({ providedIn: 'root' })
export class EncaissementService {
  private apiUrl = `${environment.apiUrl}/encaissements`;
  private apiDashboardUrl = `${environment.apiUrl}/dashboards`;

  constructor(private http: HttpClient) {}

  private handleError = (error: HttpErrorResponse) => {
    let status = error.status ?? 0;
    let message = 'Une erreur inconnue est survenue';
    let errors: ApiErrors = {};

    if (error.error instanceof ErrorEvent) {
      message = `Erreur client : ${error.error.message}`;
    } else {
      if (status === 422) {
        message = error.error?.message || 'Validation échouée.';
        errors = error.error?.data?.errors || error.error?.errors || {};
      } else if (status === 0) {
        message = 'Connexion au serveur impossible.';
      } else {
        message = error.error?.message || `Erreur ${status} : ${error.message}`;
      }
    }
    return throwError(() => ({ status, message, errors }));
  };

  create(encaissement: Encaissement): Observable<Encaissement> {
      return this.http
        .post<ApiSuccess<Encaissement>>(`${this.apiUrl}/create`, encaissement, httpOptions)
        .pipe(map((res) => res.data), catchError(this.handleError.bind(this)));
    }

  /** GET /encaissements/by-facture/{id} (si présent côté API) */
  listByFacture(factureId: number): Observable<Encaissement[]> {
    return this.http
      .get<{ success: boolean; data: any[] }>(`${this.apiUrl}/by-facture/${factureId}`)
      .pipe(
        map((res) =>
          (res.data || []).map((d) => ({
            id: d.id,
            facture_id: d.facture_id,
            montant: Number(d.montant),
            // ✅ même mapping ici
            mode_paiement: (d.mode ?? d.mode_paiement) as EncaissementMode,
            reference: d.reference ?? null,
            commentaire: d.commentaire ?? null,
            date_encaissement: d.date_encaissement,
            created_at: d.created_at,
            updated_at: d.updated_at,
          })) as Encaissement[]
        ),
        catchError(this.handleError)
      );
  }

  /** GET /dashboards/statistiques/encaissements */
  getStats(q: EncaissementStatsQueryType): Observable<EncaissementStatsType> {
    let params = new HttpParams();
    if (q.periode)   params = params.set('periode', q.periode);
    if (q.date_from) params = params.set('date_from', q.date_from);
    if (q.date_to)   params = params.set('date_to', q.date_to);

    return this.http
      .get<ApiSuccess<EncaissementStatsType>>(
        `${this.apiDashboardUrl}/statistiques/encaissements`,
        { params }
      )
      .pipe(
        map(res => res.data),
        catchError(this.handleError.bind(this))
      );
  }

}
 
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CreateCommandeDto } from 'src/app/demo/models/commande-create.dto';
import { UpdateCommandeDto } from 'src/app/demo/models/commande-update.dto';
import { Commande } from 'src/app/demo/models/commande.model';
import { environment } from 'src/environements/environment.dev';

type ApiSuccess<T> = { success: boolean; data: T };
type ApiValidation = { [field: string]: string[] };

export interface ApiErrorShape {
  status: number;
  message: string;
  errors: ApiValidation | null;
  raw: HttpErrorResponse;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({ providedIn: 'root' })
export class CommandeService {
  private apiUrl = `${environment.apiUrl}/commandes`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    // essaie de récupérer un message métier du backend (Laravel)
    const backend = error?.error as any;

    const apiErr: ApiErrorShape = {
      status: error?.status ?? 0,
      message:
        backend?.message ??
        error?.statusText ??
        (error.error instanceof ErrorEvent
          ? `Erreur client : ${error.error.message}`
          : 'Une erreur inconnue est survenue'),
      // supporte plusieurs conventions : data (custom), errors (validation Laravel)
      errors:
        (backend?.data as ApiValidation) ??
        (backend?.errors as ApiValidation) ??
        null,
      raw: error,
    };

    return throwError(() => apiErr);
  }

  getAllCommandes(): Observable<Commande[]> {
    return this.http
      .get<ApiSuccess<Commande[]>>(`${this.apiUrl}/all`)
      .pipe(map((res) => res.data), catchError(this.handleError.bind(this)));
  }

  getCommandeByNumero(numero: string): Observable<Commande> {
    return this.http
      .get<ApiSuccess<Commande>>(`${this.apiUrl}/showByNumero/${numero}`)
      .pipe(map((res) => res.data), catchError(this.handleError.bind(this)));
  }

  createCommande(commande: CreateCommandeDto): Observable<Commande> {
    return this.http
      .post<ApiSuccess<Commande>>(`${this.apiUrl}/create`, commande, httpOptions)
      .pipe(map((res) => res.data), catchError(this.handleError.bind(this)));
  }

  updateCommande(numero: string, dto: UpdateCommandeDto): Observable<Commande> {
    return this.http
      .put<ApiSuccess<Commande>>(
        `${this.apiUrl}/updateByNumero/${numero}`,
        dto,
        httpOptions
      )
      .pipe(map((res) => res.data), catchError(this.handleError.bind(this)));
  }

  deleteCommande(numero: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/deleteByNumero/${numero}`, httpOptions)
      .pipe(catchError(this.handleError.bind(this)));
  }

  validerCommande(numero: string): Observable<Commande> {
    return this.http
      .patch<{ success: boolean; commande: Commande }>(
        `${this.apiUrl}/validation/${numero}`,
        {},
        httpOptions
      )
      .pipe(map((res) => res.commande), catchError(this.handleError.bind(this)));
  }
}

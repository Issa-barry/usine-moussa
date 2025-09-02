import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environements/environment.dev';
import { Livraison } from 'src/app/demo/models/livraison.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // (Rappel: les en-têtes CORS sont côté serveur)
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }),
};

type ApiErrors = { [key: string]: string[] };
type ApiOk<T> = { success?: boolean; data: T };
type ValiderDto = { date_livraison: string; quantite_livree: number; livreur_id?: number };

@Injectable({ providedIn: 'root' })
export class LivraisonService {
  private apiUrl = `${environment.apiUrl}/livraisons`;

  constructor(private http: HttpClient) {}

  // ---- Erreurs : normalisation et extraction du 1er message 422 ----
  private handleError = (error: HttpErrorResponse) => {
  console.error('Erreur API Livraison :', error);

  const status = error.status ?? 0;
  // 🔽 On essaie d'abord message, puis error, puis data.message
  const apiMessage =
    error?.error?.message ??
    error?.error?.error ??
    error?.error?.data?.message;

  // 🔽 fallback propre
  const message =
    apiMessage ||
    (status === 0 ? 'Connexion au serveur impossible.' : `Erreur ${status} : ${error.message}`);

  const errors = error?.error?.data?.errors || error?.error?.errors || {};

  return throwError(() => ({ status, message, errors, raw: error.error }));
};



  // ---- CRUD / Queries ----
  getAll(): Observable<Livraison[]> {
    return this.http
      .get<ApiOk<Livraison[]>>(`${this.apiUrl}/all`)
      .pipe(map(res => res.data), catchError(this.handleError));
  }

  getById(id: number): Observable<Livraison> {
    return this.http
      .get<ApiOk<Livraison>>(`${this.apiUrl}/byId/${id}`)
      .pipe(map(res => res.data), catchError(this.handleError));
  }

  update(id: number, livraison: Livraison): Observable<Livraison> {
    return this.http
      .put<ApiOk<Livraison>>(`${this.apiUrl}/updateById/${id}`, livraison, httpOptions)
      .pipe(map(res => res.data), catchError(this.handleError));
  }

  delete(id: number): Observable<{ success: boolean; message: string }> {
    return this.http
      .delete<{ success: boolean; message: string }>(`${this.apiUrl}/deleteById/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getLivraisonByCommandeNumero(numero: string): Observable<Livraison[]> {
    return this.http
      .get<ApiOk<Livraison[]>>(`${this.apiUrl}/getLivraisonByCommandeNumero/${numero}`)
      .pipe(map(res => res.data), catchError(this.handleError));
  }

  /**
   * Valider une livraison pour une commande.
   * - Accepte soit ton modèle `Livraison`, soit un DTO minimal.
   * - Mappe proprement vers le payload attendu par l'API.
   */
  validerLivraison(
    commande_numero: string,
    livraison: Livraison | ValiderDto
  ): Observable<{ livraison: Livraison; facture: any }> {
    const dto: ValiderDto =
      livraison instanceof Livraison
        ? {
            date_livraison: livraison.date_livraison,
            quantite_livree: Number(livraison.quantite_livree ?? 0),
            ...(livraison.livreur?.id ? { livreur_id: livraison.livreur.id } : {}),
          }
        : {
            date_livraison: livraison.date_livraison,
            quantite_livree: Number(livraison.quantite_livree ?? 0),
            ...(livraison.livreur_id ? { livreur_id: livraison.livreur_id } : {}),
          };

    return this.http
      .post<ApiOk<{ livraison: Livraison; facture: any }>>(
        `${this.apiUrl}/valider/${commande_numero}`,
        dto,
        httpOptions
      )
      .pipe(map(res => res.data), catchError(this.handleError));
  }
}

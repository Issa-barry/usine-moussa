import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environements/environment.dev';
import { Facture } from 'src/app/demo/models/Facture';

/** ---- Modèles (adapte selon tes interfaces backend) ---- */
 

export interface CreateFacturePayload {
  commande_id: number;
  // éventuellement d’autres champs si ton endpoint les accepte
}

export interface UpdateFacturePayload {
  statut?: 'brouillon' | 'partiel' | 'payé' | 'impayé';
  montant_du?: number;
}

/** Encaissement (si tu l’appelles ici, sinon mets-le dans un EncaissementService dédié) */
export interface CreateEncaissementPayload {
  facture_id: number;
  montant: number;
  mode?: 'espèces' | 'orange-money' | 'dépot-banque';
  date_encaissement?: string; // ISO
  reference?: string;
  commentaire?: string;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,PATCH',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  private apiUrl = `${environment.apiUrl}/factures`;

  constructor(private http: HttpClient) {}

  /** ---- Gestion d'erreurs homogène ---- */
  private handleError = (error: HttpErrorResponse) => {
  console.error('Erreur API :', error);

  let message = 'Une erreur inconnue est survenue';
  let errors: Record<string, string[]> = {};

  if (error.error instanceof ErrorEvent) {
    message = `Erreur client : ${error.error.message}`;
  } else {
    switch (error.status) {
      case 400:
        message = error.error?.message || 'Requête invalide.';
        break;
      case 404:
        message = error.error?.message || 'Ressource introuvable.';
        break;
      case 409:
        message = error.error?.message || 'Conflit de ressource.';
        break;
      case 422: {
        // ⚠️ ton backend (voir capture) renvoie: { success:false, message:"…", data:{ field:[...] } }
        const be = error.error || {};
        message = be?.message || 'Données invalides.';
        errors  = be?.data || be?.errors || {}; // <-- supporte les deux formes
        break;
      }
      case 0:
        message = 'Connexion au serveur impossible.';
        break;
      default:
        message = error.error?.message || `Erreur ${error.status} : ${error.message}`;
    }
  }

  // Toujours renvoyer la même forme d'erreur à l’app
  return throwError(() => ({ status: error.status, message, errors }));
};


  /** ---- CRUD ---- */

  getAll(): Observable<Facture[]> {
    return this.http
      .get<{ success: boolean; data: Facture[] }>(`${this.apiUrl}/all`)
      .pipe(map((res) => res.data), catchError(this.handleError));
  }

  getFactureById(id: number): Observable<Facture> {
    return this.http
      .get<{ success: boolean; data: Facture }>(`${this.apiUrl}/getByID/${id}`)
      .pipe(map((res) => res.data), catchError(this.handleError));
  }

  create(payload: CreateFacturePayload): Observable<Facture> {
    return this.http
      .post<{ success: boolean; data: Facture }>( 
        `${this.apiUrl}/create`,
        payload,
        httpOptions
      )
      .pipe(map((res) => res.data), catchError(this.handleError));
  }

  update(id: number, payload: UpdateFacturePayload): Observable<Facture> {
    return this.http
      .put<{ success: boolean; data: Facture }>(
        `${this.apiUrl}/updateById/${id}`,
        payload,
        httpOptions
      )
      .pipe(map((res) => res.data), catchError(this.handleError));
  }

  delete(id: number): Observable<{ success: boolean; message: string }> {
    return this.http
      .delete<{ success: boolean; message: string }>(
        `${this.apiUrl}/deleteById/${id}`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  /** ---- Actions métier ---- */

  /** Valider une facture brouillon -> POST /factures/{id}/valider */
  valider(id: number): Observable<Facture> {
    return this.http
      .post<{ success: boolean; data: Facture }>(
        `${this.apiUrl}/${id}/valider`,
        {},
        httpOptions
      )
      .pipe(map((res) => res.data), catchError(this.handleError));
  }

  /**
   * (Option) Créer un encaissement — si tu préfères regrouper ici.
   * Sinon, mets ceci dans EncaissementService avec baseUrl `${environment.apiUrl}/encaissements`.
   */
  encaisser(payload: CreateEncaissementPayload): Observable<any> {
    const url = `${environment.apiUrl}/encaissements`;
    return this.http
      .post<{ success: boolean; data: any }>(url, payload, httpOptions)
      .pipe(map((res) => res.data), catchError(this.handleError));
  }
}

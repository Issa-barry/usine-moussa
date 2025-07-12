import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environements/environment.dev';
import { Produit } from '../../models/produit.model';
  
const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  private apiUrl = `${environment.apiUrl}/produits`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API Produit :', error);

    let errorMessage = 'Une erreur inconnue est survenue';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client : ${error.error.message}`;
    } else {
      if (error.status === 422 && error.error?.errors) {
        if (typeof error.error.errors === 'object') {
          errorMessage = Object.keys(error.error.errors)
            .map((key) => error.error.errors[key].join(' '))
            .join(' ');
        } else {
          errorMessage = JSON.stringify(error.error.errors);
        }
      } else if (error.status === 0) {
        errorMessage = 'Impossible de se connecter au serveur';
      } else {
        errorMessage = `Erreur serveur ${error.status} : ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  getProduits(): Observable<Produit[]> {
    return this.http
      .get<{ success: boolean; data: Produit[] }>(`${this.apiUrl}/all`)
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

   getProduitById(id: number): Observable<Produit> {
    return this.http
      .get<{ success: boolean; data: Produit }>(`${this.apiUrl}/getById/${id}`)
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http
      .post<{ success: boolean; data: Produit }>(
        `${this.apiUrl}/create`,
        produit,
        httpOption
      )
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  updateProduit(id: number, produit: Produit): Observable<Produit> {
    return this.http
      .put<{ success: boolean; data: Produit }>(
        `${this.apiUrl}/updateById/${id}`,
        produit,
        httpOption
      )
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  deleteProduit(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/deleteById/${id}`, httpOption)
      .pipe(catchError(this.handleError));
  }
}

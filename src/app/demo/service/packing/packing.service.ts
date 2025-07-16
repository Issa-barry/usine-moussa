import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environements/environment.dev';
import { Packing } from '../../models/packing.model';
 
const httpOptions = {
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
export class PackingService {
  private apiUrl = `${environment.apiUrl}/packings`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API Packing :', error);

    let errorMessage = 'Une erreur inconnue est survenue';
    let validationErrors: { [key: string]: string[] } = {};

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur client : ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = error.error.message || 'Requête invalide.';
          break;
        case 404:
          errorMessage = 'Packing non trouvé.';
          break;
        case 422:
          errorMessage = 'Validation échouée.';
          if (error.error && error.error.data?.errors) {
            validationErrors = error.error.data.errors;
          }
          break;
        case 0:
          errorMessage = 'Connexion au serveur impossible.';
          break;
        default:
          errorMessage = `Erreur ${error.status} : ${error.message}`;
      }
    }

    return throwError(() => ({ message: errorMessage, validationErrors }));
  }

  getAll(): Observable<Packing[]> {
    return this.http.get<{ data: Packing[] }>(`${this.apiUrl}/all`).pipe(
      map((res) => res.data),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Packing> {
    return this.http
      .get<{ success: boolean; data: Packing }>(`${this.apiUrl}/show/${id}`)
      .pipe(map((res) => res.data), catchError(this.handleError));
  }

  create(packing: Packing): Observable<Packing> {
    return this.http
      .post<{ success: boolean; data: Packing }>(
        `${this.apiUrl}/store`,
        packing,
        httpOptions
      )
      .pipe(map((res) => res.data), catchError(this.handleError));
  }

  update(id: number, packing: Packing): Observable<Packing> {
    return this.http
      .put<{ success: boolean; data: Packing }>(
        `${this.apiUrl}/update/${id}`,
        packing,
        httpOptions
      )
      .pipe(map((res) => res.data), catchError(this.handleError));
  }

  delete(id: number): Observable<{ success: boolean; message: string }> {
    return this.http
      .delete<{ success: boolean; message: string }>(
        `${this.apiUrl}/delete/${id}`,
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}

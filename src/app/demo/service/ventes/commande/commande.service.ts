import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CreateCommandeDto } from 'src/app/demo/models/commande-create.dto';
import { Commande } from 'src/app/demo/models/commande.model';
import { environment } from 'src/environements/environment.dev';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  private apiUrl = `${environment.apiUrl}/commandes`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('Erreur API Commande :', error);

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

  getAllCommandes(): Observable<Commande[]> {
    return this.http
      .get<{ success: boolean; data: Commande[] }>(`${this.apiUrl}/all`)
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  getCommandeByNumero(numero: string): Observable<Commande> {
    return this.http
      .get<{ success: boolean; data: Commande }>(`${this.apiUrl}/showByNumero/${numero}`)
      .pipe(
        map((res) => res.data),
        catchError(this.handleError)
      );
  }

  // createCommande(commande: Commande): Observable<Commande> {
  //   return this.http
  //     .post<{ success: boolean; data: Commande }>(`${this.apiUrl}/create`, commande, httpOptions)
  //     .pipe(
  //       map((res) => res.data),
  //       catchError(this.handleError)
  //     );
  // } 

  
createCommande(commande: CreateCommandeDto): Observable<Commande> {
  return this.http
    .post<{ success: boolean; data: Commande }>(`${this.apiUrl}/create`, commande, httpOptions)
    .pipe(
      map((res) => res.data),
      // catchError(this.handleError)
    );
}

  deleteCommande(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/deleteById/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}

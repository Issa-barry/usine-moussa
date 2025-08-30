import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environements/environment.dev';
import { Livraison } from 'src/app/demo/models/livraison.model';

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
export class LivraisonService {
    private apiUrl = `${environment.apiUrl}/livraisons`;

    constructor(private http: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        console.error('Erreur API Livraison :', error);

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
                    errorMessage = error.error?.message || 'Ressource non trouvée.';
                    break;
                case 422:
                    errorMessage = 'Validation échouée.';
                    if (error.error?.data?.errors) {
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

    getAll(): Observable<Livraison[]> {
        return this.http.get<{ data: Livraison[] }>(`${this.apiUrl}/all`).pipe(
            map(res => res.data),
            catchError(this.handleError)
        );
    }

    getById(id: number): Observable<Livraison> {
        return this.http.get<{ success: boolean; data: Livraison }>(
            `${this.apiUrl}/byId/${id}`
        ).pipe(
            map(res => res.data),
            catchError(this.handleError)
        );
    }

    update(id: number, livraison: Livraison): Observable<Livraison> {
        return this.http.put<{ success: boolean; data: Livraison }>(
            `${this.apiUrl}/updateById/${id}`,
            livraison,
            httpOption
        ).pipe(
            map(res => res.data),
            catchError(this.handleError)
        );
    }

    delete(id: number): Observable<{ success: boolean; message: string }> {
        return this.http.delete<{ success: boolean; message: string }>(
            `${this.apiUrl}/deleteById/${id}`,
            httpOption
        ).pipe(catchError(this.handleError));
    }

    validerLivraison(commande_numero: string, livraison: Livraison): Observable<{ livraison: Livraison; facture: any }> {
        return this.http
            .post<{ success: boolean; data: { livraison: Livraison; facture: any } }>(
                `${this.apiUrl}/valider/${commande_numero}`,
                livraison,
                httpOption
            ) 
            .pipe(
                map((res) => res.data),
                catchError(this.handleError)
            );
    }

    getLivraisonByCommandeNumero(numero: string): Observable<Livraison[]> {
        return this.http
            .get<{ success: boolean; data: Livraison[] }>(
                `${this.apiUrl}/getLivraisonByCommandeNumero/${numero}`
            )
            .pipe(
                map((res) => res.data),
                catchError(this.handleError)
            );
    }
}

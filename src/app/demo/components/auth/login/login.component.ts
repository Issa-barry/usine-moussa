import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    rememberMe: boolean = false;
    email: string = '';
    password: string = '';
    errorMessage: string = '';

    constructor(
        public router: Router,
        private authService: AuthService,
        private layoutService: LayoutService
    ) {}

    ngOnInit(): void {}

    get dark(): boolean {
        return this.layoutService.config().colorScheme !== 'light';
    }

    login(): void {
        this.errorMessage = ''; // Réinitialiser le message d'erreur avant chaque tentative

        const credentials = { email: this.email, password: this.password };

        this.authService.login(credentials).subscribe({
            next: (response) => {
                this.router.navigate(['/dashboard']);
                console.clear();
            },
            error: (err) => {
                const b = err?.error;

                this.errorMessage =
                    (typeof b === 'string' && b) ||
                    (typeof b?.error === 'string' && b.error) ||
                    (typeof b?.message === 'string' && b.message) ||
                    // Laravel validation: { errors: { email: ['...'], password: ['...'] } }
                    (b?.errors &&
                        Array.isArray(Object.values(b.errors)) &&
                        (Object.values(b.errors) as any[]).flat().join('\n')) ||
                    // Si l'API renvoie encore un objet (rare), on l'affiche en texte
                    (b?.error &&
                        typeof b.error === 'object' &&
                        JSON.stringify(b.error)) ||
                    (b && typeof b === 'object' && JSON.stringify(b)) ||
                    '';
            },
        });
    }

    goToResetPassword(): void {
        this.router.navigate(['/auth/forgotpassword']);
    }

    handleFelloClick(): void {
        this.router.navigate(['/some-page']);
    }
}

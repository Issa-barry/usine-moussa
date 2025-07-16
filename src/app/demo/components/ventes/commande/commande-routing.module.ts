import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeListeComponent } from './commande-liste/commande-liste.component';

const routes: Routes = [
    { path: '', component: CommandeListeComponent },
    {
        path: 'commande-liste',
        loadChildren: () =>
            import('./commande-liste/commande-liste.module').then(
                (m) => m.CommandeListeModule
            ),
    },
    {
        path: 'commande-new',
        loadChildren: () =>
            import('./commande-new/commande-new.module').then(
                (m) => m.CommandeNewModule
            ),
    },
    {
        path: 'commande-detail/:id',
        loadChildren: () =>
            import('./commande-detail/commande-detail.module').then(
                (m) => m.CommandeDetailModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CommandeRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivraisonListeComponent } from './livraison-liste/livraison-liste.component';

const routes: Routes = [
    { path: '', component: LivraisonListeComponent },
    {
        path: 'livraison-liste',
        loadChildren: () =>
            import('./livraison-liste/livraison-liste.module').then(
                (m) => m.LivraisonListeModule
            ),
    },
    {
        path: 'livraison-new',
        loadChildren: () =>
            import('./livraison-new/livraison-new.module').then(
                (m) => m.LivraisonNewModule
            ),
    },
    {
        path: 'livraison-detail/:id',
        loadChildren: () =>
            import('./livraison-detail/livraison-detail.module').then(
                (m) => m.LivraisonDetailModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LivraisonRoutingModule {}

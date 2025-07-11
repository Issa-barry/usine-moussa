import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitListeComponent } from './produit-liste/produit-liste.component';

const routes: Routes = [
    { path: '', component: ProduitListeComponent },
    {
        path: 'produit-liste',
        loadChildren: () =>
            import('./produit-liste/produit-liste.module').then(
                (m) => m.ProduitListeModule
            ),
    },
    { path: 'produit-new', loadChildren: () => import('./produit-new/produit-new.module').then(m => m.ProduitNewModule) },
    { path: 'produit-detail', loadChildren: () => import('./produit-detail/produit-detail.module').then(m => m.ProduitDetailModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProduitRoutingModule {}

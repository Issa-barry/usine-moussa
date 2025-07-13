import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListeComponent } from './stock-liste/stock-liste.component';
 
const routes: Routes = [
    { path: '', component: StockListeComponent },
    {
        path: 'stock-liste',
        loadChildren: () =>
            import('./stock-liste/stock-liste.module').then(
                (m) => m.StockListeModule
            ),
    },
    { path: 'produit', loadChildren: () => import('./produit/produit.module').then(m => m.ProduitModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StockRoutingModule {}

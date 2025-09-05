import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'E-Commerce Dashboard'}, loadChildren: () => import('./ecommerce/ecommerce.dashboard.module').then(m => m.EcommerceDashboardModule) },
        { path: 'dashboard-banking', data: {breadcrumb: 'Banking Dashboard'}, loadChildren: () => import('./banking/banking.dashboard.module').then(m => m.BankingDashboardModule) },
        { path: 'commande-stat', loadChildren: () => import('./ui/commande-stat/commande-stat.module').then(m => m.CommandeStatModule) },
        { path: 'facture-stat', loadChildren: () => import('./ui/facture-stat/facture-stat.module').then(m => m.FactureStatModule) }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
  
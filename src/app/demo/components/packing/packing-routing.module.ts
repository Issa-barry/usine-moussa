import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackingListeComponent } from './packing-liste/packing-liste.component';

const routes: Routes = [
    { path: '', component: PackingListeComponent },
    {
        path: 'packing-liste',
        loadChildren: () =>
            import('./packing-liste/packing-liste.module').then(
                (m) => m.PackingListeModule
            ),
    },
    { path: 'packing-new', loadChildren: () => import('./packing-new/packing-new.module').then(m => m.PackingNewModule) },
    { path: 'packing-detail/:id', loadChildren: () => import('./packing-detail/packing-detail.module').then(m => m.PackingDetailModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PackingRoutingModule {}

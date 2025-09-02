import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

import { LivraisonDetailRoutingModule } from './livraison-detail-routing.module';
import { LivraisonDetailComponent } from './livraison-detail.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';

@NgModule({
    declarations: [LivraisonDetailComponent],
    imports: [
        CommonModule,
        LivraisonDetailRoutingModule,
        FormsModule,
        CheckboxModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        RippleModule,
        InputGroupModule,
        InputGroupAddonModule,
        MultiSelectModule,
        TableModule,
        MessageModule,
        ToastModule,
        TagModule,
    ],
})
export class LivraisonDetailModule {}

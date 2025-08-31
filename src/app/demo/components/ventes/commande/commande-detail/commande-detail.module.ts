import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup'; 
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
  
import { CommandeDetailRoutingModule } from './commande-detail-routing.module';
import { CommandeDetailComponent } from './commande-detail.component';
import { MessageModule } from 'primeng/message';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    CommandeDetailComponent
  ],
  imports: [
    CommonModule,
    CommandeDetailRoutingModule,
    FormsModule,
            CheckboxModule,
            DropdownModule,
            InputTextModule,
            InputNumberModule,
            ButtonModule,
            RippleModule,
            InputGroupModule,
            InputGroupAddonModule,
            ToastModule,
            ConfirmPopupModule,
            ConfirmDialogModule,
            MultiSelectModule,
            MessageModule,
            TagModule
  ]
})
export class CommandeDetailModule { }

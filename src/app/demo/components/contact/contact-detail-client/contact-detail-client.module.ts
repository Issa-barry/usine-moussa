import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 import { FormsModule } from '@angular/forms';
 import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';

import { ContactDetailClientRoutingModule } from './contact-detail-client-routing.module';
import { ContactDetailClientComponent } from './contact-detail-client.component';


@NgModule({
  declarations: [
    ContactDetailClientComponent
  ],
  imports: [
    CommonModule,
    ContactDetailClientRoutingModule,
     FormsModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule, 
        InputGroupModule,
        InputGroupAddonModule, 
        PasswordModule, 
        ToastModule, 
        ProgressSpinnerModule,
        DialogModule,
        ConfirmDialogModule,
        DividerModule,
        PanelModule,
        SkeletonModule
  ]
})
export class ContactDetailClientModule { }

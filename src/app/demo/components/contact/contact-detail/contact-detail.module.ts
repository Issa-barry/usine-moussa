import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactDetailRoutingModule } from './contact-detail-routing.module';
import { FormsModule } from '@angular/forms';
import { ProfileCreateRoutingModule } from '../../profile/create/profilecreate-routing.module';
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
import { ContactDetailComponent } from './contact-detail.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({ 
  declarations: [ContactDetailComponent],
  imports: [
    CommonModule,
    ContactDetailRoutingModule,
       FormsModule,
        ProfileCreateRoutingModule,
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
        DialogModule,ConfirmDialogModule,
        DividerModule,
        PanelModule,
        SkeletonModule
  ]
})
export class ContactDetailModule { }
 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

 
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { ContactNewClientRoutingModule } from './contact-new-client-routing.module';
import { ContactNewClientComponent } from './contact-new-client.component';


@NgModule({
  declarations: [
    ContactNewClientComponent
  ],
  imports: [
    CommonModule,
    ContactNewClientRoutingModule,
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
  ]
})
export class ContactNewClientModule { }

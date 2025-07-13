import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EditorModule } from 'primeng/editor';
 import { ProduitNewRoutingModule } from './produit-new-routing.module';
import { ProduitNewComponent } from './produit-new.component';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    ProduitNewComponent
  ],
  imports: [
    CommonModule,
    ProduitNewRoutingModule,
     InputTextModule,
		ChipModule,
		DropdownModule,
		FormsModule,
		FileUploadModule,
		ButtonModule,
		RippleModule,
		InputSwitchModule,
		EditorModule,
    ToastModule
  ] 
})
export class ProduitNewModule { } 

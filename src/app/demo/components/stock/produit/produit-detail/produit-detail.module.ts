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
import { ToolbarModule } from 'primeng/toolbar';

import { ProduitDetailRoutingModule } from './produit-detail-routing.module';
import { ProduitDetailComponent } from './produit-detail.component';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    ProduitDetailComponent
  ],
  imports: [
    CommonModule,
    ProduitDetailRoutingModule,
    CommonModule,
         InputTextModule,
        ChipModule,
        DropdownModule,
        FormsModule,
        FileUploadModule,
        ButtonModule,
        RippleModule,
        InputSwitchModule,
        EditorModule,
        ToolbarModule,
        ToastModule,
        SkeletonModule,
        ConfirmDialogModule
        
  ]
})
export class ProduitDetailModule { }

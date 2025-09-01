import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturationDetailRoutingModule } from './facturation-detail-routing.module';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FacturationDetailComponent } from './facturation-detail.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
 

@NgModule({
  declarations: [FacturationDetailComponent],
  imports: [
    CommonModule,
    FacturationDetailRoutingModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    DialogModule,
    FormsModule,
  DropdownModule,
  InputTextModule,
  InputTextareaModule,
  DialogModule,
  ButtonModule,
  ToastModule,
  MessageModule

  ]
})
export class FacturationDetailModule { }

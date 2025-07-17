import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFrPipe } from './date-fr.pipe';
 
@NgModule({
  declarations: [
    DateFrPipe
  ],
  imports: [
    CommonModule // obligatoire pour *ngIf, *ngFor, etc.
  ],
  exports: [
    DateFrPipe
  ]
})
export class SharedModule { }

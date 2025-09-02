import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateFrPipe } from './date-fr.pipe'; // pipe standalone
import { PhoneFormatPipe } from './phone-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    DateFrPipe,   // ✅ on l’importe
    PhoneFormatPipe
  ],
  exports: [
    CommonModule,
    DateFrPipe,   // ✅ on le ré-exporte
    PhoneFormatPipe
  ],
})
export class SharedModule {}

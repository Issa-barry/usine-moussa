import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFr'
})
export class DateFrPipe implements PipeTransform {
  transform(value: string | Date | null | undefined, withTime: boolean = true): string {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...(withTime && {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }
}

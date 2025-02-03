import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateWithoutTime'
})
export class DateWithoutTimePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);

    return date.toISOString().split('T')[0];
  }
}